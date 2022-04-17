import hash from "object-hash";
import nested from "postcss-nested";
import postcss from "postcss";
import { setStyleSheet, rebuildCssString, removeEmptyLines } from "./utils";

export const css = (strings: TemplateStringsArray, ...args: unknown[]) => {
  // Convert strings array into string & inject args
  let convertedString = "";
  strings.forEach((item, index) => {
    const arg = index < args.length ? args[index] : "";
    convertedString = convertedString + item + arg;
  });

  const parsedString = removeEmptyLines(convertedString);

  // Create a class name using the hash of the css string
  let className = hash(parsedString);
  className = className.substring(0, 10);
  const css = `.${className} { ${parsedString} }`;

  addToStyleSheet(css);

  return className;
};

const addToStyleSheet = (css: string) => {
  // Get style element
  const sheet = setStyleSheet();
  if (!sheet) throw new Error("Stylesheet not correctly mounted");

  // Process nested css and add css to style element
  postcss([nested])
    .process(css, { from: undefined })
    .then((res) => {
      const splitCssNodes = rebuildCssString(res);
      splitCssNodes.forEach((node) => {
        sheet.insertRule(node);
      });
    });
};
