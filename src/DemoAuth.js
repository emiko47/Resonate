import { createContext, useContext, useState } from "react";
const storageKey = "resonate.demo-session.v1";
const DemoAuthContext = createContext({ session: null });
export function DemoAuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      return saved?.demo === true &&
        typeof saved.displayname === "string" &&
        typeof saved.email === "string"
        ? saved
        : null;
    } catch {
      return null;
    }
  });
  function startDemoSession({ displayname, email }) {
    const next = {
      displayname: displayname.trim() || email.split("@")[0],
      email: email.trim(),
      demo: true,
    };
    setSession(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  }
  function endDemoSession() {
    setSession(null);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }
  return (
    <DemoAuthContext.Provider
      value={{ session, startDemoSession, endDemoSession }}
    >
      {children}
    </DemoAuthContext.Provider>
  );
}
export function useDemoAuth() {
  return useContext(DemoAuthContext);
}
