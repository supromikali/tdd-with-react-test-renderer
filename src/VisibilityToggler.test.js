import React, { useState } from "react";
import { create, act } from "react-test-renderer";

const VisibilityToggler = ({ children }) => {
  const [isVisible, setVisibility] = useState(false);
  const toggle = () => setVisibility(!isVisible);
  return (
    <>
      <button onClick={toggle}>toggle</button>
      {isVisible && children}
    </>
  );
};

test("should toggle children nodes on button click", () => {
  const root = create(
    <VisibilityToggler>
      <div>awecome content</div>
    </VisibilityToggler>
  ).root;

  // helper to get nodes other than "button"
  const getChildrenCount = () =>
    root.findAll(node => node.type !== "button").length;

  // assert that button exists
  expect(root.findAllByType("button").length).toEqual(1);

  // query for a button
  const button = root.findAllByType("button")[0];

  // remember initial nodes count (before toggle)
  const initialCount = getChildrenCount();

  // trigger a hook by calling onClick of a button
  act(button.props.onClick);
  const countAfterFirstClick = getChildrenCount();

  // assert that nodes count after a click is greater than before
  expect(countAfterFirstClick > initialCount).toBe(true);

  // trigger another click
  act(button.props.onClick);
  const countAfterSecondClick = getChildrenCount();

  // check that nodes were toggled off and the count of rendered nodes match initial
  expect(countAfterSecondClick === initialCount).toBe(true);
});
