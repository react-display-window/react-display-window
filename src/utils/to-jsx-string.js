import sobj from 'stringify-object';
// import prettier from 'prettier/standalone';


function improveCurly(str) {
  if (str.startsWith('{')) {
    str = '{ ' + str.slice(1);
  }
  if (str.endsWith('}')) {
    str = str.slice(0, -1) + ' }';
  }
  return str;
}


function getLevelIndentation(level) {
  return new Array(level).fill(0).reduce((memo, _) => memo + '  ', '');
}


function getType(element) {
  const { type } = element;
  if ( ! type) {
    return '';
  }
  return typeof type === 'string' ? type : type.name;
}


function renderStringProp(prop) {
  const [ key, value ] = prop;
  return `${key}="${value}"`;
}


function renderObjectProp(prop) {
  const [ key, value ] = prop;
  if (value === true) {
    return key;
  }
  const valueStr = improveCurly(sobj(value, { indent: '  ', inlineCharacterLimit: 50 }));
  return `${key}={${valueStr}}`;
}


function renderProps(props) {
  const { children, ...rest } = props;
  return ' ' + Object.entries(rest)
    .map((e) => typeof e[1] === 'string' ? renderStringProp(e) : renderObjectProp(e))
    .join(' ');
}


function renderWithChildren(element, level) {
  const { props } = element;
  const children = Array.isArray(props.children) ? props.children : [ props.children ];
  const type = getType(element);
  const indentation = getLevelIndentation(level);
  return [
    `${indentation}<${type}${renderProps(props)}>`,
    ...children.reduce((memo, c) => [ ...memo, ...renderNode(c, level + 1) ], []),
    `${indentation}</${type}>`,
  ];
}


function renderWithoutChildren(element, level) {
  const { props } = element;
  const type = getType(element);
  const indentation = getLevelIndentation(level);
  if ( ! type) {
    return [
      `${indentation}${element}`,
    ];
  }
  return [
    `${indentation}<${type}${renderProps(props)} />`,
  ];
}


function renderNode(element, level) {
  const { props } = element;
  if (props && props.children) {
    return renderWithChildren(element, level);
  }
  else {
    return renderWithoutChildren(element, level);
  }
}


export default function toJsxString(element) {
  const code = renderNode(element, 0).map((l, i, a) => i != a.length - 1 ? l + '\n' : l).join('');
  return prettier.format(code, {
    semi: false,
    jsxBracketSameLine: true,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'always',
    parser: window.prettierPlugins.babylon.parsers.babylon.parse,
  }).slice(1).trim();
}
