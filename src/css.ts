import hash from "object-hash";
import nested from "postcss-nested";
import postcss from "postcss";
import { setStyleSheet, rebuildCssString } from "./utils";

export const css = (strings: TemplateStringsArray, ...args: unknown[]) => {
  const convertedString = strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? args[index] : ""),
    ""
  );

  const parsedString = removeEmptyLines(convertedString);

  let className = hash(parsedString);
  className = className.substring(0, 10);
  const css = `.${className} { ${parsedString} }`;

  addToStyleSheet(css, className);

  return className;
};

const removeEmptyLines = (string: string) => {
  return string.replace(/^\s*\n/gm, "");
};

const addToStyleSheet = (css: string, className: string) => {
  const sheet = setStyleSheet();
  if (!sheet) throw new Error("Stylesheet not correctly mounted");

  postcss([nested])
    .process(css, { from: undefined })
    .then((res) => {
      const splitCssNodes = rebuildCssString(res);
      splitCssNodes.forEach((node) => {
        sheet.insertRule(node);
      });
    });
};
