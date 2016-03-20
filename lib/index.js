'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getResponse = require('./get-response');

var _getResponse2 = _interopRequireDefault(_getResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var resolveRedirect = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
    var maxRedirect = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];
    var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];
    var count, currentUrl, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (typeof maxRedirect === 'function') {
              callback = maxRedirect;
              maxRedirect = 3;
            }

            count = 0;
            currentUrl = url;

          case 3:
            if (!(count < maxRedirect)) {
              _context.next = 22;
              break;
            }

            _context.prev = 4;
            _context.next = 7;
            return (0, _getResponse2.default)(currentUrl);

          case 7:
            response = _context.sent;

            if (!(response.statusCode === 301 || response.statusCode === 302)) {
              _context.next = 13;
              break;
            }

            currentUrl = response.headers.location;
            count = count + 1;
            _context.next = 14;
            break;

          case 13:
            return _context.abrupt('break', 22);

          case 14:
            _context.next = 20;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context['catch'](4);

            callback(_context.t0);
            throw _context.t0;

          case 20:
            _context.next = 3;
            break;

          case 22:

            callback(null, currentUrl);

            return _context.abrupt('return', currentUrl);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 16]]);
  }));

  return function resolveRedirect(_x, _x2, _x3) {
    return ref.apply(this, arguments);
  };
}();

exports.default = resolveRedirect;