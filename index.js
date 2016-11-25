'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dockerModem = require('docker-modem');

var _dockerModem2 = _interopRequireDefault(_dockerModem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hyper = function () {
  function Hyper(opts) {
    _classCallCheck(this, Hyper);

    this.modem = new _dockerModem2.default(opts);
  }

  _createClass(Hyper, [{
    key: 'createPod',
    value: function createPod(opts, callback) {
      var optsf = {
        path: '/pod/create',
        method: 'POST',
        options: opts,
        statusCodes: {
          201: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        callback(err, data);
      });
    }
  }, {
    key: 'startPod',
    value: function startPod(opts, callback) {
      var optsf = {
        path: '/pod/start?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        callback(err, data);
      });
    }
  }, {
    key: 'stopPod',
    value: function stopPod(opts, callback) {
      var optsf = {
        path: '/pod/stop?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        callback(err, data);
      });
    }
  }, {
    key: 'deletePod',
    value: function deletePod(opts, callback) {
      var optsf = {
        path: '/pod?',
        method: 'DELETE',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        callback(err, data);
      });
    }
  }, {
    key: 'createContainer',
    value: function createContainer(opts, callback) {
      var optsf = {
        path: '/container/create?',
        method: 'POST',
        options: opts,
        statusCodes: {
          201: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        callback(err, data);
      });
    }
  }, {
    key: 'getContainers',
    value: function getContainers(callback) {
      var optsf = {
        path: '/list?',
        method: 'GET',
        options: { item: 'container' },
        statusCodes: {
          201: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        if (err) return callback(err, data);
        callback(err, data.cData.map(parseContainer));
      });
    }
  }, {
    key: 'getImages',
    value: function getImages(opts, callback) {
      if (typeof opts === 'function') {
        callback = opts;
        opts = {};
      }

      var optsf = {
        path: '/images/get?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        if (err) return callback(err, data);
        callback(err, data.imagesList.map(parseImage));
      });
    }
  }, {
    key: 'createImage',
    value: function createImage(opts, callback) {
      var optsf = {
        path: '/image/create?',
        method: 'POST',
        options: opts,
        isStream: true,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        callback(err, data);
      });
    }
  }, {
    key: 'deleteImage',
    value: function deleteImage(opts, callback) {
      var optsf = {
        path: '/image?',
        method: 'DELETE',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      this.modem.dial(optsf, function (err, data) {
        callback(err, data);
      });
    }
  }]);

  return Hyper;
}();

exports.default = Hyper;


function parseContainer(str) {
  var s = str.split(':');
  return {
    id: s[0],
    pod: {
      name: s[1],
      id: s[2]
    },
    status: s[3]
  };
}

function parseImage(str) {
  var s = str.split(':');
  return {
    name: s[0],
    tag: s[1],
    id: s[2],
    created: s[3],
    size: s[4]
  };
}

