'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var getResponse = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
    var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

    var _parseUrl, protocol, host, pathname, search, path, err;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _parseUrl = (0, _url.parse)(url);
            protocol = _parseUrl.protocol;
            host = _parseUrl.host;
            pathname = _parseUrl.pathname;
            search = _parseUrl.search;
            path = search ? pathname + '?' + search : pathname;

            if (protocol && host && path) {
              _context.next = 10;
              break;
            }

            err = new Error('Not a valid URL: ' + url);

            callback(err);
            throw err;

          case 10:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              var req = ('https:' === protocol ? _https2.default : _http2.default).request({
                method: 'HEAD',
                host: host,
                path: path
              }, function (res) {
                callback(null, res);
                resolve(res);
              });

              req.end();
            }));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getResponse(_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

exports.default = getResponse;