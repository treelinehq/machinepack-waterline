module.exports = {


  friendlyName: 'Transaction',


  description: 'Begin a transaction, perform some logic, then either commit the transaction if everything worked, or roll it back if there were any errors.',


  habitat: 'sails',


  inputs: {

    datastore: {
      description: 'The identity of the datastore to use.',
      example: 'larrysMySQLCluster',
      required: true
    },

    during: {
      description: 'A function with custom logic to run once a database connection is established and a transaction has begun.',
      extendedDescription: 'This function will be provided access to the active database connection.',
      example: '->',
      required: true,
      contract: {
        inputs: {
          connection: { example: '===' }
        },
        exits: {
          success: {
            outputFriendlyName: 'Result',
            outputDescription: 'The data (if any) returned from the transaction callback.',
            outputExample: '==='
          }
        }
      }
    },

    connection: require('../constants/connection.input'),

    meta: require('../constants/meta.input')

  },


  exits: {

    success: {
      description: 'The specified logic ran without incident, and the transaction was committed successfully.',
      outputFriendlyName: 'Result',
      outputDescription: 'The result data sent back by the provided logic (`during`).',
      outputExample: '==='
    },

  },


  fn: function(inputs, exits) {
    var _isObject = require('lodash.isobject');
    var _isUndefined = require('lodash.isundefined');

    if (!_isObject(env.sails.hooks.orm)) {
      return exits.error(new Error('`sails.hooks.orm` cannot be accessed; please ensure this machine is being run in a compatible habitat.'));
    }

    var Datastore = env.sails.hooks.orm.datastores[inputs.datastore];
    if (!_isObject(Datastore)) {
      return exits.error(new Error('Unrecognized datastore (`'+inputs.datastore+'`).  Please check your `config/datastores.js` file to verify that a datastore with this identity exists.'));
    }

    // Start building the deferred object.
    var pending = Datastore.transaction(function _duringTransaction(connection, done) {
      inputs.during({ connection: connection }).exec(done);
    });

    // Use metadata if provided.
    if (!_isUndefined(inputs.meta)) {
      pending = pending.meta(inputs.meta);
    }

    // Use existing connection if one was provided.
    if (!_isUndefined(inputs.connection)) {
      pending = pending.usingConnection(inputs.connection);
    }

    // Now kick everything off.
    // (this begins the transaction, runs the provided logic,
    //  and either commits or rolls back as is appropriate)
    pending.exec(function afterwards(err, result, meta) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(result);
    });
    //
    // Note that, behind the scenes, Waterline is doing:
    //
    // Datastore.driver.getConnection({manager: Datastore.manager})
    // Datastore.driver.beginTransaction()
    // _duringTransaction()
    // |
    // |_ Datastore.driver.commitTransaction()
    // |  Datastore.driver.releaseConnection()
    //-or-
    // |_ Datastore.driver.rollbackTransaction()
    //    Datastore.driver.releaseConnection()
  },


};
