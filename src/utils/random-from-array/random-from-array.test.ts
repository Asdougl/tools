import { randomFromArray } from ".";

describe("randomFromArray", () => {
  it("should return a random element from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = randomFromArray(array);
    expect(array).toContain(result);
  });

  it("should return undefined if the array is empty", () => {
    const array: number[] = [];
    const result = randomFromArray(array);
    expect(result).toBeUndefined();
  });
});

