
<h1>
  <a href="http://node-machine.org" title="Node-Machine public registry"><img alt="node-machine logo" title="Node-Machine Project" src="http://node-machine.org/images/machine-anthropomorph-for-white-bg.png" width="50" /></a>
  machinepack-waterline
</h1>

## Warning
Currently, this is experimental.  See the [Waterline driver interface](https://github.com/node-machine/waterline-driver-interface) for more information.


### Example


##### Using `.find()`

```javascript
Waterline.find({
  model: 'users',
  where: {
    age: { '>': 50 },
    preferredNumRazorBlades: { '>=': 3 }
  }
}).setEnvironment({ sails: sails })
.exec(function (err){
  // ...
});
```


##### Using `.query()`

```javascript
Waterline.query({
  datastore: 'ricksMySQLDb',
  statement: {}
}).setEnvironment({ sails: sails })
.exec(function (err){
  // ...
});
```


##### Using `.connect()`

```javascript
Waterline.connect({
  datastore: 'ricksMySQLDb',
  during: function (connection, done) {
    Waterline.find({
      model: 'user',
      connection: connection
    })
    .setEnvironment({ sails: sails })
    .exec(done)
  }
}).setEnvironment({ sails: sails })
.exec(function (err){
  // ...
});
```


##### Using `.transaction()`

```javascript
Waterline.transaction({
  datastore: 'ricksMySQLDb',
  during: function (connection, done) {
    Waterline.find({
      model: 'user',
      connection: connection
    })
    .setEnvironment({ sails: sails })
    .exec(done)
  }
}).setEnvironment({ sails: sails })
.exec(function (err){
  // ...
});
```




<!--
### [Docs](http://node-machine.org/machinepack-waterline) &nbsp; [Browse other machines](http://node-machine.org/machinepacks) &nbsp;  [FAQ](http://node-machine.org/implementing/FAQ)  &nbsp;  [Newsgroup](https://groups.google.com/forum/?hl=en#!forum/node-machine)

A database-agnostic connectivity library for sending queries, managing dynamic db connections, committing/rolling back transactions, and more.


## Installation &nbsp; [![NPM version](https://badge.fury.io/js/machinepack-waterline.svg)](http://badge.fury.io/js/machinepack-waterline) [![Build Status](https://travis-ci.org/mikermcneil/machinepack-waterline.png?branch=master)](https://travis-ci.org/mikermcneil/machinepack-waterline)

```sh
$ npm install machinepack-waterline
```

## Usage

For the latest usage documentation, version information, and test status of this module, see <a href="http://node-machine.org/machinepack-waterline" title="A database-agnostic connectivity library for sending queries, managing dynamic db connections, committing/rolling back transactions, and more. (for node.js)">http://node-machine.org/machinepack-waterline</a>.  The generated manpages for each machine contain a complete reference of all expected inputs, possible exit states, and example return values.  If you need more help, or find a bug, jump into [Gitter](https://gitter.im/node-machine/general) or leave a message in the project [newsgroup](https://groups.google.com/forum/?hl=en#!forum/node-machine).



## About  &nbsp; [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/node-machine/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is a [machinepack](http://node-machine.org/machinepacks), an NPM module which exposes a set of related Node.js [machines](http://node-machine.org/spec/machine) according to the [machinepack specification](http://node-machine.org/spec/machinepack).
Documentation pages for the machines contained in this module (as well as all other NPM-hosted machines for Node.js) are automatically generated and kept up-to-date on the <a href="http://node-machine.org" title="Public machine registry for Node.js">public registry</a>.
Learn more at <a href="http://node-machine.org/implementing/FAQ" title="Machine Project FAQ (for implementors)">http://node-machine.org/implementing/FAQ</a>.

-->

## License

MIT &copy; 2016 contributors

