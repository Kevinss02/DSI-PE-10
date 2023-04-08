import "mocha";
import { expect } from "chai";
import { add } from "../src/index";

describe("add", () => {
  it("should return the sum of two numbers", () => {
    const result = add(2, 3);
    expect(result).to.equal(5);
  });

  it("should handle negative numbers", () => {
    const result = add(-2, 3);
    expect(result).to.equal(1);
  });

  it("should handle zero values", () => {
    const result = add(0, 0);
    expect(result).to.equal(0);
  });
});
