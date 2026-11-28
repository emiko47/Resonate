import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
global.TextEncoder = require("util").TextEncoder;
jest.mock("react-router-dom", () => jest.requireActual("react-router"));
const { MemoryRouter, Routes, Route } = require("react-router-dom");
const Navbar = require("./Navbar").default;
const CreatePost = require("./CreatePost").default;
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
beforeEach(() => {
  localStorage.clear();
  window.matchMedia = () => ({ matches: false });
});
test("sidebar collapse persists and icon navigation still changes routes", () => {
  function App() {
    return (
      <MemoryRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route index element={<h1>Home content</h1>} />
            <Route path="events" element={<h1>Events content</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  }
  const view = render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));
  expect(
    screen.getByRole("button", { name: "Expand sidebar" }),
  ).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Discover navigation" }),
    ).getByRole("link", { name: "Events" }),
  );
  expect(
    screen.getByRole("heading", { name: "Events content" }),
  ).toBeInTheDocument();
  view.unmount();
  render(<App />);
  expect(
    screen.getByRole("button", { name: "Expand sidebar" }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
  expect(
    screen.getByRole("button", { name: "Collapse sidebar" }),
  ).toHaveAttribute("aria-expanded", "true");
});
test("discarding a post requires confirmation and Keep editing preserves input", () => {
  render(
    <MemoryRouter initialEntries={["/createpost"]}>
      <Routes>
        <Route path="createpost" element={<CreatePost />} />
        <Route path="communities/calgary-rap" element={<h1>Community</h1>} />
      </Routes>
    </MemoryRouter>,
  );
  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "My music discovery" },
  });
  fireEvent.change(screen.getByLabelText("Content"), {
    target: { value: "An unfinished recommendation." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Discard", exact: true }));
  expect(screen.getByRole("alertdialog")).toHaveTextContent(
    "Discard this post?",
  );
  fireEvent.click(screen.getByRole("button", { name: "Keep editing" }));
  expect(screen.getByLabelText("Title")).toHaveValue("My music discovery");
  expect(screen.getByLabelText("Content")).toHaveValue(
    "An unfinished recommendation.",
  );
  fireEvent.click(screen.getByRole("button", { name: "Discard", exact: true }));
  fireEvent.click(
    screen.getByRole("button", { name: "Discard post", exact: true }),
  );
  expect(
    screen.getByRole("heading", { name: "Community" }),
  ).toBeInTheDocument();
});
test("Escape dismisses the discard warning without losing a post", () => {
  render(
    <MemoryRouter>
      <CreatePost />
    </MemoryRouter>,
  );
  fireEvent.change(screen.getByLabelText("Title"), {
    target: { value: "Keep this title" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Discard", exact: true }));
  fireEvent(
    screen.getByRole("alertdialog"),
    new Event("cancel", { bubbles: true, cancelable: true }),
  );
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  expect(screen.getByLabelText("Title")).toHaveValue("Keep this title");
});

test("mobile drawer closes when a destination is selected", () => {
  window.matchMedia = () => ({ matches: true });
  render(
    <MemoryRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<h1>Home content</h1>} />
          <Route path="events" element={<h1>Events content</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
  expect(
    screen.getByRole("button", { name: "Close navigation" }),
  ).toBeInTheDocument();
  fireEvent.click(
    within(
      screen.getByRole("navigation", { name: "Discover navigation" }),
    ).getByRole("link", { name: "Events" }),
  );
  expect(
    screen.getByRole("button", { name: "Expand sidebar" }),
  ).toHaveAttribute("aria-expanded", "false");
  expect(
    screen.getByRole("heading", { name: "Events content" }),
  ).toBeInTheDocument();
});
