import { assert, expect, test } from "vitest";
import { removeEmptyLines, rebuildCssString } from "./utils";

test("Remove empty lines", () => {
  const input = "abc \n \n 123";

  expect(removeEmptyLines(input)).eq("abc \n 123");
});

test("Rebuild css string", () => {
  const input: any = {
    root: {
      nodes: [
        {
          selector: ".testSelector",
          nodes: [{ prop: "testProp", value: "testValue" }],
        },
      ],
    },
  };

  expect(rebuildCssString(input)[0]).toBe(
    ".testSelector {  \n testProp: testValue; \n }"
  );
});
