import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
global.TextEncoder = require("util").TextEncoder;
jest.mock("react-router-dom", () => jest.requireActual("react-router"));
const { MemoryRouter, Routes, Route } = require("react-router-dom");
const CreatePost = require("./CreatePost").default;
const PostDrafts = require("./PostDrafts").default;
const CreateCommunity = require("./CreateCommunity").default;
const { readPostDrafts } = require("./PostDraftStorage");
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
beforeEach(() => localStorage.clear());
function setup(path = "/createpost") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="createpost" element={<CreatePost />} />
        <Route path="postdrafts" element={<PostDrafts />} />
        <Route
          path="communities/calgary-rap"
          element={<h1>Community page</h1>}
        />
        <Route
          path="communities/2000s-pop"
          element={<h1>Pop community page</h1>}
        />
        <Route path="createcommunity" element={<CreateCommunity />} />
        <Route path="communities" element={<h1>Communities page</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}
test("post Save for Later persists and resumes the same draft without duplicates", () => {
  const view = setup("/createpost?community=2000s-pop");
  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "My saved music thought" },
  });
  fireEvent.change(screen.getByLabelText("Content"), {
    target: { value: "An idea for later." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save for Later" }));
  expect(
    screen.getByRole("heading", { name: "Post drafts" }),
  ).toBeInTheDocument();
  view.unmount();
  setup("/postdrafts");
  fireEvent.click(screen.getByRole("link", { name: "Resume" }));
  expect(screen.getByLabelText("Title")).toHaveValue("My saved music thought");
  expect(screen.getByLabelText("Content")).toHaveValue("An idea for later.");
  expect(screen.getByText("2000s Pop")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Content"), {
    target: { value: "Updated idea." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save for Later" }));
  expect(readPostDrafts()).toHaveLength(1);
  expect(readPostDrafts()[0].content).toBe("Updated idea.");
});
test("post Back saves unfinished work and returns to its community", () => {
  setup();
  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "Saved when going back" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Back to community" }));
  expect(
    screen.getByRole("heading", { name: "Community page" }),
  ).toBeInTheDocument();
  expect(readPostDrafts()[0].title).toBe("Saved when going back");
});
test("even an empty post requires discard confirmation", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Discard", exact: true }));
  expect(screen.getByRole("alertdialog")).toHaveTextContent(
    "Discard this post?",
  );
  fireEvent.click(screen.getByRole("button", { name: "Keep editing" }));
  expect(screen.getByLabelText("Title")).toBeInTheDocument();
});
test("discarding a resumed draft deletes it only after confirmation", () => {
  setup();
  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "A temporary draft" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save for Later" }));
  fireEvent.click(screen.getByRole("link", { name: "Resume" }));
  fireEvent.click(screen.getByRole("button", { name: "Discard", exact: true }));
  expect(readPostDrafts()).toHaveLength(1);
  fireEvent.click(
    within(screen.getByRole("alertdialog")).getByRole("button", {
      name: "Discard post",
    }),
  );
  expect(readPostDrafts()).toHaveLength(0);
  expect(
    screen.getByRole("heading", { name: "Community page" }),
  ).toBeInTheDocument();
});
test("community Back and Discard both protect edits", () => {
  setup("/createcommunity");
  fireEvent.change(screen.getByLabelText("Community name"), {
    target: { value: "Calgary Shoegaze" },
  });
  fireEvent.change(screen.getByLabelText("About your community"), {
    target: { value: "A place to discover dreamy guitars." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Rock", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Back to communities" }));
  expect(screen.getByRole("alertdialog")).toHaveTextContent(
    "Discard this community?",
  );
  fireEvent.click(screen.getByRole("button", { name: "Keep editing" }));
  expect(screen.getByLabelText("Community name")).toHaveValue(
    "Calgary Shoegaze",
  );
  expect(
    screen.getByRole("button", { name: "Rock", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(screen.getByRole("button", { name: "Discard", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Discard community" }));
  expect(
    screen.getByRole("heading", { name: "Communities page" }),
  ).toBeInTheDocument();
});
