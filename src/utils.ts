import { Result } from "postcss";

export const setStyleSheet = () => {
  if (!window) {
    let cssRules: string[] = [];
    return {
      cssRules,
      insertRule: (css: string) => (cssRules = [...cssRules, css]),
    };
  } else {
    const styleElement = document.querySelector(
      '[title="artizan"]'
    ) as HTMLStyleElement;
    if (!styleElement) throw new Error("Stylesheet not correctly mounted");
    return styleElement.sheet;
  }
};

export const rebuildCssString = (inputCss: Result) => {
  return inputCss.root.nodes.map((node) => {
    let css = ``;
    node.nodes.forEach((element) => {
      css = `${css} \n ${element.prop}: ${element.value};`;
    });

    return `${node.selector} { ${css} \n }`;
  });
};
