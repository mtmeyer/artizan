import { nanoid } from "nanoid";
import nested from "postcss-nested";
import postcss from "postcss";
import { setStyleSheet, rebuildCssString } from "./utils";

export const css = (strings: TemplateStringsArray, ...args: unknown[]) => {
  const sheet = setStyleSheet();
  if (!sheet) throw new Error("Stylesheet not correctly mounted");

  strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? args[index] : ""),
    ""
  );

  const className = nanoid(10);

  const css = `.${className} { ${strings[0]} }`;

  postcss([nested])
    .process(css, { from: undefined })
    .then((res) => {
      const splitCssNodes = rebuildCssString(res);
      splitCssNodes.forEach((node) => {
        sheet.insertRule(node);
      });
    });

  return className;
};
