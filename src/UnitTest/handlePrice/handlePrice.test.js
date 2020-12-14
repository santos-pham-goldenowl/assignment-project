import formatPrice from "./handlePrice";

// Updated test case with a Link to a different address
it("check price", () => {
  expect(formatPrice(123456789)).toBe("123.456.789");
});
