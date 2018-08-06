import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/es6.object.define-property";
import "core-js/modules/es6.object.create";
import "core-js/modules/es6.object.set-prototype-of";
import "core-js/modules/es6.array.map";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import cn from 'classnames';
import hljs from 'highlightjs';
import { StyleSheet, css } from 'aphrodite-jss';
import toJsxString from '../utils/to-jsx-string';
import 'highlightjs/styles/foundation.css';
var styles = StyleSheet.create({
  playGround: {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 0',
    borderRadius: 5,
    border: '1px solid rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
  },
  renderZone: {
    padding: '32px 16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.15)'
  },
  sourceZone: {
    width: '100%',
    margin: 0,
    '& .Code': {
      margin: 0,
      padding: '24px 16px'
    }
  }
});

function getCode(children) {
  return React.Children.map(children, function (child) {
    return toJsxString(child) + '\n';
  }).join('');
}

var PlayGround =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PlayGround, _React$Component);

  function PlayGround() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PlayGround);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PlayGround)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      code: '',
      prevComputedCode: null
    });

    return _this;
  }

  _createClass(PlayGround, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      hljs.initHighlighting();
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var code = this.state.code;
      return React.createElement("div", {
        className: css(styles.playGround)
      }, React.createElement("div", {
        className: css(styles.renderZone)
      }, children), React.createElement("div", {
        className: css(styles.sourceZone)
      }, React.createElement("pre", {
        className: cn(css(styles.source), 'Code', 'hljs')
      }, React.createElement("code", {
        className: "react"
      }, code))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var children = nextProps.children;
      var prevComputedCode = prevState.prevComputedCode;
      var code = getCode(children);

      if (prevComputedCode === code) {
        return null;
      }

      return {
        code: code,
        prevComputedCode: code
      };
    }
  }]);

  return PlayGround;
}(React.Component);

export default PlayGround;