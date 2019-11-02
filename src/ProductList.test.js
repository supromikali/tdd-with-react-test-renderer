import React from "react";
import { create } from "react-test-renderer";

const ProductList = ({ list }) => (
  <ul>
    {list.map(li => (
      <li key={li.id}>{li.text}</li>
    ))}
  </ul>
);

test("renders a list of items with correct items count", () => {
  // prepare the list for testing
  const list = [{ id: 1, text: "first item" }, { id: 2, text: "second item" }];

  // boilerplate code
  const root = create(<ProductList list={list} />).root;

  // get list items
  const elementList = root.findAllByType("li");

  // assert if the length match with original list passed as a prop
  expect(elementList.length).toEqual(list.length);
});

test("renders all items with correct text", () => {
  // prepare the list for testing
  const list = [{ id: 1, text: "first item" }, { id: 2, text: 33 }];

  // boilerplate code
  const root = create(<ProductList list={list} />).root;

  // get list items
  const elementList = root.findAllByType("li");

  // [ 10 ] Iterate over all items and search for text occurence in children
  elementList.forEach((el, index) => {
    // [ 11 ]
    expect(el.children.includes(`${list[index].text}`)).toBe(true);
  });
});
