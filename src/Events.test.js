import React from "react";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
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

test("date range filters combine with genre and can be cleared", () => {
  setup();
  fireEvent.click(screen.getByText("Dates · Any date"));
  fireEvent.change(screen.getByLabelText("From date"), { target: { value: "2026-11-07" } });
  fireEvent.change(screen.getByLabelText("To date"), { target: { value: "2026-11-13" } });
  expect(screen.getAllByRole("article")).toHaveLength(2);
  fireEvent.change(screen.getByLabelText("Genre"), { target: { value: "Jazz" } });
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(screen.getByText("Jazz in the Park")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("From date"), { target: { value: "2026-11-08" } });
  expect(screen.getByText("No events match your search.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(screen.getByLabelText("From date")).toHaveValue("");
  expect(screen.getByLabelText("To date")).toHaveValue("");
  expect(screen.getAllByRole("article")).toHaveLength(4);
});

test("Saved Events separates saved and RSVPed events while applying filters", () => {
  localStorage.setItem("resonate.events.v1.saved", JSON.stringify(["sebastian-live", "jazz-in-the-park"]));
  localStorage.setItem("resonate.events.v1.going", JSON.stringify(["jazz-in-the-park", "bedroom-pop"]));
  setup();
  fireEvent.click(screen.getByRole("tab", { name: "Saved Events" }));
  const savedSection = screen.getByRole("region", { name: "Saved events" });
  const rsvpSection = screen.getByRole("region", { name: "RSVPed events" });
  expect(within(savedSection).getAllByRole("article")).toHaveLength(2);
  expect(within(rsvpSection).getAllByRole("article")).toHaveLength(2);
  expect(within(savedSection).getByText("Jazz in the Park")).toBeInTheDocument();
  expect(within(rsvpSection).getByText("Jazz in the Park")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Genre"), { target: { value: "Dream Pop" } });
  expect(within(savedSection).getByText("No saved events match your filters.")).toBeInTheDocument();
  expect(within(rsvpSection).getByText("A Little Dream Pop")).toBeInTheDocument();
});

test("deleting an event draft requires confirmation", () => {
  localStorage.setItem("resonate.events.v1.drafts", JSON.stringify([{ id: "draft-1", title: "Unfinished show" }]));
  setup();
  fireEvent.click(screen.getByRole("tab", { name: /Drafts/ }));
  fireEvent.click(screen.getByRole("button", { name: "Delete" }));
  let confirmation = screen.getByRole("alertdialog", { name: "Delete this event draft?" });
  fireEvent.click(within(confirmation).getByRole("button", { name: "Keep draft" }));
  expect(screen.getByText("Unfinished show")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Delete" }));
  confirmation = screen.getByRole("alertdialog", { name: "Delete this event draft?" });
  fireEvent.click(within(confirmation).getByRole("button", { name: "Delete draft" }));
  expect(screen.queryByText("Unfinished show")).not.toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem("resonate.events.v1.drafts"))).toHaveLength(0);
});

test("saving creation preserves the form as a draft, then discard removes it", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Create Event" }));
  fireEvent.change(screen.getByLabelText(/Title/), {
    target: { value: "My unfinished show" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Save for Later" }));
  const savedDialog = screen.getByRole("dialog", { name: "Event draft saved" });
  expect(savedDialog).toHaveTextContent("not published yet");
  expect(savedDialog).toHaveTextContent("Drafts tab");
  fireEvent.click(within(savedDialog).getByRole("button", { name: "View drafts" }));
  expect(screen.getByRole("tab", { name: /Drafts/ })).toHaveAttribute("aria-selected", "true");
  fireEvent.click(screen.getByRole("button", { name: "Continue editing" }));
  expect(screen.getByLabelText(/Title/)).toHaveValue("My unfinished show");
  fireEvent.click(screen.getByRole("button", { name: "Discard" }));
  const warning = screen.getByRole("alertdialog");
  expect(warning).toHaveTextContent("Discard this event?");
  fireEvent.click(
    within(warning).getByRole("button", { name: "Keep editing" }),
  );
  expect(screen.getByLabelText(/Title/)).toHaveValue("My unfinished show");
  fireEvent.click(screen.getByRole("button", { name: "Discard", exact: true }));
  fireEvent.click(
    within(screen.getByRole("alertdialog")).getByRole("button", {
      name: "Discard event",
    }),
  );
  expect(screen.getByText(/No drafts yet/)).toBeInTheDocument();
});

test("publishing validates the location and adds a persistent event with RSVP", async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ display_name: "123 Test Street" }) });
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
  await waitFor(() => expect(screen.getByLabelText("Address")).toHaveValue("123 Test Street"));
  fireEvent.click(screen.getByRole("button", { name: "Post Event" }));
  const dialog = screen.getByRole("dialog");
  expect(
    within(dialog).getByRole("heading", { name: "My test show" }),
  ).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole("button", { name: "RSVP" }));
  const confirmation = screen.getByRole("dialog", { name: "Confirm your RSVP" });
  expect(confirmation).toHaveTextContent("does not guarantee a spot or ticket");
  expect(within(dialog).getByRole("button", { name: "RSVP" })).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(within(confirmation).getByRole("button", { name: "Cancel" }));
  fireEvent.click(within(dialog).getByRole("button", { name: "RSVP" }));
  fireEvent.click(within(screen.getByRole("dialog", { name: "Confirm your RSVP" })).getByRole("button", { name: "Confirm RSVP" }));
  expect(
    within(dialog).getByRole("button", { name: "Going" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(within(dialog).getByRole("button", { name: "Going" })).toHaveClass("event-rsvp-active");
  view.unmount();
  setup();
  expect(
    screen.getByRole("heading", { name: "My test show" }),
  ).toBeInTheDocument();
  expect(
    JSON.parse(localStorage.getItem("resonate.events.v1.going")),
  ).toHaveLength(1);
});

test("address lookup places a pin and map selection fills the address", async () => {
  global.fetch = jest.fn((url) => Promise.resolve({
    ok: true,
    json: async () => url.includes("/search?")
      ? [{ lat: "51.05", lon: "-114.07" }]
      : { display_name: "456 Map Street, Calgary" },
  }));
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Create Event" }));
  fireEvent.change(screen.getByLabelText("Address"), { target: { value: "123 Test Street, Calgary" } });
  await waitFor(() => expect(screen.getByText(/Pin set: 51.0500, -114.0700/)).toBeInTheDocument(), { timeout: 3000 });
  fireEvent.click(screen.getByRole("button", { name: "Pick venue location" }));
  await waitFor(() => expect(screen.getByLabelText("Address")).toHaveValue("456 Map Street, Calgary"));
  expect(screen.getByText(/Pin set: 51.0400, -114.0600/)).toBeInTheDocument();
});

test("an empty event requires explicit discard confirmation", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Create Event" }));
  expect(screen.queryByRole("button", { name: "Back to events" })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Close dialog" })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Discard", exact: true }));
  expect(screen.getByRole("alertdialog")).toHaveTextContent(
    "Discard this event?",
  );
  fireEvent.click(screen.getByRole("button", { name: "Keep editing" }));
  expect(screen.getByLabelText(/Title/)).toHaveValue("");
});

test("Escape and clicking outside do not close event creation", () => {
  setup();
  fireEvent.click(screen.getByRole("button", { name: "Create Event" }));
  const dialog = screen.getByRole("dialog");
  const cancel = new Event("cancel", { bubbles: true, cancelable: true });
  fireEvent(dialog, cancel);
  expect(cancel.defaultPrevented).toBe(true);
  fireEvent.click(dialog, { clientX: -1, clientY: -1 });
  expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
});
