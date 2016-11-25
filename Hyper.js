import Modem from 'docker-modem'

export default class Hyper {

  constructor(opts) {
    this.modem = new Modem(opts);
  }

  createPod(opts, callback) {
    var optsf = {
      path: '/pod/create',
      method: 'POST',
      options: opts,
      statusCodes: {
        201: true,
        500: 'server error'
      }
    };

    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }

  startPod(opts, callback) {
    var optsf = {
      path: '/pod/start?',
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    };

    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }

  stopPod(opts, callback) {
    var optsf = {
      path: '/pod/stop?',
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    };

    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }

  deletePod(opts, callback) {
    var optsf = {
      path: '/pod?',
      method: 'DELETE',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    };

    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }

  createContainer(opts, callback) {
    var optsf = {
      path: '/container/create?',
      method: 'POST',
      options: opts,
      statusCodes: {
        201: true,
        500: 'server error'
      }
    };

    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }

  getContainers(callback) {
    var optsf = {
      path: '/list?',
      method: 'GET',
      options: {item: 'container'},
      statusCodes: {
        201: true,
        500: 'server error'
      }
    };

    this.modem.dial(optsf, function(err, data) {
      if(err) return callback(err, data);
      callback(err, data.cData.map(parseContainer));
    });
  }

  getImages(opts, callback) {
    if(typeof opts === 'function') {
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

    this.modem.dial(optsf, function(err, data) {
      if(err) return callback(err, data);
      callback(err, data.imagesList.map(parseImage));
    });

  }

  createImage(opts, callback) {
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

    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });
  }

  deleteImage(opts, callback) {
    var optsf = {
      path: '/image?',
      method: 'DELETE',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    };

    this.modem.dial(optsf, function(err, data) {
      callback(err, data);
    });

  }

}

function parseContainer(str) {
  let s = str.split(':')
  return {
    id: s[0],
    pod: {
      name: s[1],
      id: s[2]
    },
    status: s[3]
  }
}

function parseImage(str) {
  let s = str.split(':')
  return {
    name: s[0],
    tag: s[1],
    id: s[2],
    created: s[3],
    size: s[4]
  }
}

