import { nanoid } from "nanoid";

export const css = (strings: TemplateStringsArray, ...args: unknown[]) => {
  const styleElement = document.querySelector(
    '[title="cssInJs"]'
  ) as HTMLStyleElement;
  if (!styleElement) throw new Error("Stylesheet not correctly mounted");
  const sheet = styleElement.sheet;
  if (!sheet) throw new Error("stylesheet not correctly mounted");

  strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? args[index] : ""),
    ""
  );

  const className = nanoid(10);

  sheet.insertRule(`.${className} { ${strings[0]} }`);

  return className;
};
