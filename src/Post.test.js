import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
global.TextEncoder = require("util").TextEncoder;
jest.mock("react-router-dom", () => jest.requireActual("react-router"));
const { MemoryRouter, Routes, Route } = require("react-router-dom");
const Post = require("./Post").default;
beforeEach(() => localStorage.clear());
function setup(postId = "1") {
  return render(
    <MemoryRouter initialEntries={[`/communities/calgary-rap/${postId}`]}>
      <Routes>
        <Route path="communities/:communityId/:postId" element={<Post />} />
      </Routes>
    </MemoryRouter>,
  );
}
test("individual discussions and the full list collapse without losing a drafted reply", () => {
  setup();
  fireEvent.click(
    screen.getByRole("button", { name: "Reply to User 1", exact: true }),
  );
  fireEvent.change(
    screen.getByRole("textbox", { name: "Reply to User 1", exact: true }),
    { target: { value: "Keep this draft" } },
  );
  fireEvent.click(
    screen.getByRole("button", {
      name: "Collapse discussion by User 1",
      exact: true,
    }),
  );
  expect(screen.getByText("I agree!")).not.toBeVisible();
  fireEvent.click(
    screen.getByRole("button", {
      name: "Expand discussion by User 1",
      exact: true,
    }),
  );
  expect(
    screen.getByRole("textbox", { name: "Reply to User 1", exact: true }),
  ).toHaveValue("Keep this draft");
  fireEvent.click(screen.getByRole("button", { name: "Hide discussions" }));
  expect(screen.getByText("I agree!")).not.toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "Show discussions" }));
  expect(
    screen.getByRole("textbox", { name: "Reply to User 1", exact: true }),
  ).toHaveValue("Keep this draft");
});
test("a specific reply is attached to its parent and survives reloading the post", () => {
  const view = setup();
  fireEvent.click(
    screen.getByRole("button", { name: "Reply to User 2", exact: true }),
  );
  fireEvent.change(
    screen.getByRole("textbox", { name: "Reply to User 2", exact: true }),
    { target: { value: "What part of the track stood out to you?" } },
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Post reply", exact: true }),
  );
  const reply = screen
    .getByText("What part of the track stood out to you?")
    .closest("article");
  expect(
    within(reply).getByRole("link", { name: "Reply to User 2", exact: true }),
  ).toBeInTheDocument();
  view.unmount();
  setup();
  expect(
    screen.getByText("What part of the track stood out to you?"),
  ).toBeInTheDocument();
});
test("post route selects the right post and new discussions respect newest-first order", () => {
  setup("2");
  expect(
    screen.getByRole("heading", {
      name: "What happened to that unreleased track?",
    }),
  ).toBeInTheDocument();
  fireEvent.change(screen.getByRole("combobox", { name: "Discussion order" }), {
    target: { value: "newest" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Join the discussion" }));
  fireEvent.change(
    screen.getByRole("textbox", { name: "Reply to post", exact: true }),
    { target: { value: "A new root discussion" } },
  );
  fireEvent.click(screen.getByRole("button", { name: "Post reply" }));
  const list = screen.getByRole("list", { name: "Post discussions" });
  expect(list.firstElementChild).toHaveTextContent("A new root discussion");
});
