import "regenerator-runtime/runtime";
import "core-js/modules/es6.promise";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var path = require('path');

var serve = require('webpack-serve');

var buildConfig = require('../webpack.config.js');

export function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var args,
        runningIn,
        docPath,
        finalDocPath,
        docName,
        docDir,
        config,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            args = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            runningIn = process.cwd();
            docPath = args.path;
            finalDocPath = path.resolve(runningIn, docPath);
            docName = path.basename(finalDocPath);
            docDir = path.dirname(finalDocPath);
            process.chdir(path.resolve(__dirname, '../'));
            _context.next = 9;
            return buildConfig({
              runningIn: runningIn,
              docName: docName,
              docDir: docDir
            });

          case 9:
            config = _context.sent;
            serve({}, {
              config: config
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _main.apply(this, arguments);
}