import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
global.TextEncoder = require("util").TextEncoder;
// CRA's Jest 27 resolver does not understand React Router 7's /dom export.
jest.mock("react-router-dom", () => jest.requireActual("react-router"));
const { MemoryRouter } = require("react-router-dom");
const Events = require("./Events").default;

jest.mock(
  "./EventMap",
  () =>
    function MockMap({ onPick }) {
      return onPick ? (
        <button type="button" onClick={() => onPick([51.04, -114.06])}>
          Pick venue location
        </button>
      ) : (
        <div>Event map</div>
      );
    },
);
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
beforeEach(() => localStorage.clear());
function setup() {
  return render(
    <MemoryRouter initialEntries={["/events"]}>
      <Events />
    </MemoryRouter>,
  );
}

test("search and genre filters combine, and saved events survive a remount", () => {
  const view = setup();
  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "dream" },
  });
  expect(screen.getAllByRole("article")).toHaveLength(1);
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Jazz" } });
  expect(screen.getByText("No events match your search.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
  fireEvent.click(
    screen.getByRole("button", { name: "Save A Little Dream Pop" }),
  );
  view.unmount();
  setup();
  fireEvent.click(screen.getByRole("tab", { name: "Saved Events" }));
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(
    screen.getByRole("heading", { name: "A Little Dream Pop" }),
  ).toBeInTheDocument();
});

test("closing creation preserves current form as a draft, then discard removes it", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Create Event" }));
  fireEvent.change(screen.getByLabelText(/Title/), {
    target: { value: "My unfinished show" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
  fireEvent.click(screen.getByRole("tab", { name: /Drafts/ }));
  fireEvent.click(screen.getByRole("button", { name: "Continue editing" }));
  expect(screen.getByLabelText(/Title/)).toHaveValue("My unfinished show");
  fireEvent.click(screen.getByRole("button", { name: "Discard" }));
  expect(screen.getByText(/No drafts yet/)).toBeInTheDocument();
});

test("publishing validates the location and adds a persistent event with RSVP", () => {
  const view = setup();
  fireEvent.click(screen.getByRole("button", { name: "Create Event" }));
  for (const [label, value] of [
    [/Title/, "My test show"],
    ["Description", "Local music night"],
    ["Venue", "Test venue"],
    ["Address", "123 Test Street"],
    ["Date", "2099-12-01"],
    ["Time (Calgary)", "20:00"],
  ]) {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  }
  fireEvent.click(screen.getByRole("button", { name: "Jazz", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "Post Event" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Choose the event location",
  );
  fireEvent.click(screen.getByRole("button", { name: "Pick venue location" }));
  fireEvent.click(screen.getByRole("button", { name: "Post Event" }));
  const dialog = screen.getByRole("dialog");
  expect(
    within(dialog).getByRole("heading", { name: "My test show" }),
  ).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole("button", { name: "RSVP" }));
  expect(
    within(dialog).getByRole("button", { name: "Going ✓" }),
  ).toHaveAttribute("aria-pressed", "true");
  view.unmount();
  setup();
  expect(
    screen.getByRole("heading", { name: "My test show" }),
  ).toBeInTheDocument();
  expect(
    JSON.parse(localStorage.getItem("resonate.events.v1.going")),
  ).toHaveLength(1);
});
