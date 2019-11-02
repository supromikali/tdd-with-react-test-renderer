import React from "react";
// [ 1 ] import the React Test Renderer
import { create } from "react-test-renderer";

const BtnGroup = ({ className = "", ...rest }) => (
  <div {...rest} className={`btn-group ${className}`} />
);

test("the className of the component includes btn-group", () => {
  // [ 2 ] create component
  const component = create(<BtnGroup />);

  // [ 3 ] get "test instance" of the component
  const instance = component.root;

  // [ 4 ] get BtnGroup element by node type
  const element = instance.findByType("div");

  // [ 5 ] assert that className equals btn-group
  expect(element.props.className.includes("btn-group")).toBe(true);
});

test("renders BtnGroup component with children", () => {
  // [ 6 ] child text
  const text = "child";

  // boilerplate code, already mentioned in [ 2 - 3 ] above
  const instance = create(<BtnGroup>{text}</BtnGroup>).root;

  // [ 7 ] get element by component name
  const element = instance.findByType(BtnGroup);

  console.log(element.props);

  // [ 8 ] assert child to match text
  expect(element.props.children).toEqual(text);
});

test("renders BtnGroup component with custom props", () => {
  // generate some custom props
  const props = {
    id: "awesome-button-id",
    className: "mb-3",
    children: "child"
  };

  // boilerplate code
  const instance = create(<BtnGroup {...props} />).root;

  // get element by component name
  const element = instance.findByType("div");

  // assert if an additional className was added to existing one
  expect(element.props.className).toEqual("btn-group mb-3");
  // assert "id" prop to match passed one
  expect(element.props.id).toEqual(props.id);
  // assert "children" to match passed
  expect(element.props.children).toEqual(props.children);
});
