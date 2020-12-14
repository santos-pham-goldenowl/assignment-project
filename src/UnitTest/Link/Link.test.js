import React from "react";
import renderer from "react-test-renderer";
import Link from "./Link";

// Updated test case with a Link to a different address
it("renders correctly", () => {
  const tree = renderer
    .create(<Link page="http://www.instagram.com">Instagram</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
