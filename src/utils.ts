import { Result } from "postcss";

// Either gets existing style tag or mocks for server side
export const setStyleSheet = () => {
  if (typeof window === "undefined") {
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

// Takes output from postCSS and rebuilds it into a valid string
export const rebuildCssString = (inputCss: Result) => {
  return inputCss.root.nodes.map((node) => {
    let css = ``;
    node.nodes.forEach((element) => {
      css = `${css} \n ${element.prop}: ${element.value};`;
    });

    return `${node.selector} { ${css} \n }`;
  });
};
