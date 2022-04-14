import { nanoid } from "nanoid";

export const css = (strings: TemplateStringsArray, ...args: unknown[]) => {
  const sheet = getStyleSheet();
  if (!sheet) throw new Error("Stylesheet not correctly mounted");

  strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? args[index] : ""),
    ""
  );

  const className = nanoid(10);

  sheet.insertRule(`.${className} { ${strings[0]} }`);

  return className;
};

const getStyleSheet = () => {
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
