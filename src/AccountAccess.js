import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDemoAuth } from "./DemoAuth";
import Icon from "./Icon";
import "./cssfiles/auth.css";
export function safeReturnPath(value) {
  return value?.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\") &&
    !/^\/(login|signup)([/?#]|$)/.test(value)
    ? value
    : "/";
}
export default function AccountAccess({ signup = false }) {
  const { startDemoSession } = useDemoAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const destination = safeReturnPath(params.get("next"));
  const next = `?next=${encodeURIComponent(destination)}`;
  const [displayname, setDisplayname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setPassword("");
    setConfirm("");
    setError("");
  }, [signup]);
  function submit(event) {
    event.preventDefault();
    setError("");
    if (signup && !displayname.trim())
      return setError("Enter a display name for your demo profile.");
    if (signup && password !== confirm)
      return setError("Your passwords do not match. Please try again.");
    startDemoSession({
      displayname: signup ? displayname : email.split("@")[0],
      email,
    });
    setPassword("");
    setConfirm("");
    navigate(destination, { replace: true });
  }
  return (
    <main className="account-page">
      <section className="account-story">
        <Link to="/" className="account-brand">
          <img src="/assets/resonate-mark.svg" alt="" width="54" height="54" />
          <span>
            Resonate<small>A MUSIC COMMUNITY</small>
          </span>
        </Link>
        <div className="account-story-copy">
          <span className="eyebrow">
            YOUR KIND OF MUSIC. YOUR KIND OF PEOPLE.
          </span>
          <h1>
            Good music.
            <br />
            Better company.
          </h1>
          <p>
            Discover your next favourite sound and join the conversations that
            make it mean more.
          </p>
          <img src="/assets/music-art.svg" className="account-art" alt="" />
        </div>
        <img className="account-wave" src="/assets/sound-wave.svg" alt="" />
        <span className="account-story-footer">
          A little more discovery. A lot more connection.
        </span>
      </section>
      <section className="account-panel">
        <Link to={destination} className="account-back">
          <Icon name="left" size={16} />
          Back to browsing
        </Link>
        <div className="account-form-wrap">
          <span className="account-demo-label">
            <Icon name="user" size={14} />
            COURSE PROJECT · DEMO
          </span>
          <h2>{signup ? "Find your people." : "Welcome back."}</h2>
          <p className="account-subtitle">
            {signup
              ? "Create a demo profile and make yourself at home."
              : "Log in to your demo space on Resonate."}
          </p>
          <div className="account-demo-note">
            Prototype only: no real account is created. Use sample details;
            passwords are not stored or sent.
          </div>
          <form onSubmit={submit} autoComplete="off">
            {signup && (
              <label htmlFor="account-name">
                Display name
                <input
                  id="account-name"
                  required
                  maxLength={40}
                  autoComplete="off"
                  placeholder="How should we call you?"
                  value={displayname}
                  onChange={(event) => setDisplayname(event.target.value)}
                />
              </label>
            )}
            <label htmlFor="account-email">
              Email
              <input
                id="account-email"
                required
                type="email"
                autoComplete="off"
                maxLength={200}
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <div className="account-password-group">
              <label htmlFor="account-password">Password</label>
              <div className="password-field">
                <input
                  id="account-password"
                  required
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  maxLength={128}
                  autoComplete="new-password"
                  aria-describedby="password-hint"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <span id="password-hint" className="field-hint">
              Use any sample password with at least 8 characters.
            </span>
            {signup && (
              <label htmlFor="account-confirm">
                Confirm password
                <input
                  id="account-confirm"
                  required
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  maxLength={128}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  placeholder="Re-enter your sample password"
                />
              </label>
            )}
            {error && (
              <p className="account-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="account-submit">
              {signup ? "Create demo account" : "Log in to demo"}
              <Icon name="arrow" size={18} />
            </button>
          </form>
          <p className="account-switch">
            {signup ? "Already exploring with us?" : "New to Resonate?"}{" "}
            <Link to={`${signup ? "/login" : "/signup"}${next}`}>
              {signup ? "Log in" : "Create an account"}
            </Link>
          </p>
          <p className="account-footnote">
            Browsing is always open. Your demo session is saved only in this
            browser.
          </p>
        </div>
      </section>
    </main>
  );
}
