import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
global.TextEncoder = require("util").TextEncoder;
jest.mock("react-router-dom", () => jest.requireActual("react-router"));
const { MemoryRouter, Routes, Route } = require("react-router-dom");
const AccountAccess = require("./AccountAccess").default;
const { safeReturnPath } = require("./AccountAccess");
const { DemoAuthProvider, useDemoAuth } = require("./DemoAuth");
function DemoHome() {
  const { session, endDemoSession } = useDemoAuth();
  return (
    <>
      <h1>
        {session ? `Hello ${session.displayname}` : "Browsing as a guest"}
      </h1>
      <button onClick={endDemoSession}>Log out</button>
    </>
  );
}
function setup(path = "/signup") {
  return render(
    <DemoAuthProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="signup" element={<AccountAccess signup />} />
          <Route path="login" element={<AccountAccess />} />
          <Route path="events" element={<DemoHome />} />
          <Route index element={<DemoHome />} />
        </Routes>
      </MemoryRouter>
    </DemoAuthProvider>,
  );
}
beforeEach(() => localStorage.clear());
test("sign-up validates confirmation and stores a demo session without passwords", () => {
  const view = setup("/signup?next=%2Fevents");
  fireEvent.change(screen.getByLabelText("Display name"), {
    target: { value: "Mira" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "mira@example.test" },
  });
  fireEvent.change(screen.getByLabelText("Password", { exact: true }), {
    target: { value: "sample-password" },
  });
  fireEvent.change(screen.getByLabelText("Confirm password"), {
    target: { value: "different-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Create demo account" }));
  expect(screen.getByRole("alert")).toHaveTextContent("passwords do not match");
  fireEvent.change(screen.getByLabelText("Confirm password"), {
    target: { value: "sample-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Create demo account" }));
  expect(
    screen.getByRole("heading", { name: "Hello Mira" }),
  ).toBeInTheDocument();
  const saved = localStorage.getItem("resonate.demo-session.v1");
  expect(JSON.parse(saved)).toEqual({
    displayname: "Mira",
    email: "mira@example.test",
    demo: true,
  });
  expect(saved).not.toContain("sample-password");
  view.unmount();
  setup("/");
  expect(
    screen.getByRole("heading", { name: "Hello Mira" }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Log out" }));
  expect(localStorage.getItem("resonate.demo-session.v1")).toBeNull();
});
test("login offers sign-up, reveals a sample password on request, and enters a demo session", () => {
  setup("/login");
  expect(
    screen.getByRole("link", { name: "Create an account" }),
  ).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "rayan@example.test" },
  });
  fireEvent.change(screen.getByLabelText("Password", { exact: true }), {
    target: { value: "sample-password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Show password" }));
  expect(screen.getByLabelText("Password", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  fireEvent.click(screen.getByRole("button", { name: "Log in to demo" }));
  expect(
    screen.getByRole("heading", { name: "Hello rayan" }),
  ).toBeInTheDocument();
});
test("return destinations stay inside the app", () => {
  for (const target of [
    "https://example.com",
    "//example.com",
    "/\\example.com",
    "/login",
    "/signup?next=/",
  ])
    expect(safeReturnPath(target)).toBe("/");
  expect(safeReturnPath("/events?event=bedroom-pop")).toBe(
    "/events?event=bedroom-pop",
  );
});
