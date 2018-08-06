import "core-js/modules/es6.string.iterator";
import "core-js/modules/es6.array.from";
import "core-js/modules/es6.regexp.to-string";
import "core-js/modules/es6.date.to-string";
import "core-js/modules/es6.array.index-of";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/es6.symbol";
import "core-js/modules/es6.array.is-array";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es7.object.entries";
import "core-js/modules/es6.array.map";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.array.fill";
import "core-js/modules/es6.array.reduce";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import sobj from 'stringify-object';

function getLevelIndentation(level) {
  return new Array(level).fill(0).reduce(function (memo, _) {
    return memo + '  ';
  }, '');
}

function getType(element) {
  var type = element.type;

  if (!type) {
    return '';
  }

  return typeof type === 'string' ? type : type.name;
}

function renderStringProp(prop) {
  var _prop = _slicedToArray(prop, 2),
      key = _prop[0],
      value = _prop[1];

  return "".concat(key, "=\"").concat(value, "\"");
}

function renderObjectProp(prop) {
  var _prop2 = _slicedToArray(prop, 2),
      key = _prop2[0],
      value = _prop2[1];

  var valueStr = sobj(value, {
    indent: '  ',
    inlineCharacterLimit: 50
  }).slice(1, -1);
  return "".concat(key, "={{ ").concat(valueStr, " }}");
}

function renderProps(props) {
  var children = props.children,
      rest = _objectWithoutProperties(props, ["children"]);

  return ' ' + Object.entries(rest).map(function (e) {
    return typeof e[1] === 'string' ? renderStringProp(e) : renderObjectProp(e);
  }).join(' ');
}

function renderWithChildren(element, level) {
  var props = element.props;
  var children = Array.isArray(props.children) ? props.children : [props.children];
  var type = getType(element);
  var indentation = getLevelIndentation(level);
  return ["".concat(indentation, "<").concat(type).concat(renderProps(props), ">")].concat(_toConsumableArray(children.reduce(function (memo, c) {
    return _toConsumableArray(memo).concat(_toConsumableArray(renderNode(c, level + 1)));
  }, [])), ["".concat(indentation, "</").concat(type, ">")]);
}

function renderWithoutChildren(element, level) {
  var type = getType(element);
  var indentation = getLevelIndentation(level);

  if (!type) {
    return ["".concat(indentation).concat(element)];
  }

  return ["".concat(indentation, "<").concat(type, " />")];
}

function renderNode(element, level) {
  var props = element.props;

  if (props && props.children) {
    return renderWithChildren(element, level);
  } else {
    return renderWithoutChildren(element, level);
  }
}

export default function toJsxString(element) {
  return renderNode(element, 0).map(function (l, i, a) {
    return i != a.length - 1 ? l + '\n' : l;
  }).join('');
}