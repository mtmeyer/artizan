import { assert, expect, test } from "vitest";
import { removeEmptyLines } from "./utils";

test("Remove empty lines", () => {
  const input = "abc \n \n 123";

  expect(removeEmptyLines(input)).eq("abc \n 123");
});
