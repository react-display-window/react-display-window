export function getProps(Component) {
  const { __docgenInfo: docgenInfo } = Component;
  const { props } = docgenInfo;
  return props || {};
}
