import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";
import "./cssfiles/navbar.css";
import { notificationsData } from "./mockdata/Notifications";

const navigation = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/exploremusic", label: "Explore Music", icon: "explore" },
  {
    to: "/communities",
    label: "Communities",
    icon: "users",
    other: ["/createcommunity", "/createpost"],
  },
  { to: "/events", label: "Events", icon: "calendar" },
  { to: "/mycollections", label: "My Collections", icon: "bookmark" },
];
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    function searchShortcut(event) {
      if (
        event.key === "/" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !event.target.closest("input, textarea, select, [contenteditable=true]")
      ) {
        event.preventDefault();
        navigate("/search");
      }
    }
    document.addEventListener("keydown", searchShortcut);
    return () => document.removeEventListener("keydown", searchShortcut);
  }, [navigate]);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("resonate.sidebar.collapsed");
      return saved === null
        ? window.matchMedia("(max-width: 700px)").matches
        : saved === "true";
    } catch {
      return false;
    }
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationRef = useRef(null);
  const notificationButton = useRef(null);
  useEffect(() => {
    try {
      localStorage.setItem("resonate.sidebar.collapsed", String(collapsed));
    } catch {}
  }, [collapsed]);
  useEffect(() => {
    function closeOutside(event) {
      if (!notificationRef.current?.contains(event.target))
        setNotificationsOpen(false);
    }
    function closeWithEscape(event) {
      if (event.key === "Escape" && notificationsOpen) {
        setNotificationsOpen(false);
        notificationButton.current?.focus();
      }
    }
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [notificationsOpen]);
  useEffect(() => {
    setNotificationsOpen(false);
  }, [location.pathname]);
  const active = navigation.find((item) =>
    item.to === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.to) ||
        item.other?.includes(location.pathname),
  );
  return (
    <main
      id="fullPage"
      className={collapsed ? "sidebar-collapsed" : "sidebar-expanded"}
    >
      <header id="topBar">
        <Link to="/" className="brand" aria-label="Resonate home">
          <img src="/assets/resonate-mark.svg" alt="" width="46" height="46" />
          <span>
            Resonate<small>A MUSIC COMMUNITY</small>
          </span>
        </Link>
        <div className="topbar-context">
          <span>YOUR NEXT DISCOVERY</span>
          <strong>
            {active?.label ||
              (location.pathname === "/chat"
                ? "Messages"
                : location.pathname === "/search"
                  ? "Search"
                  : "Your profile")}
          </strong>
        </div>
        <nav id="rightPart" aria-label="Account navigation">
          <NavLink
            to="/search"
            className="header-search"
            aria-label="Search music, people and events"
          >
            <Icon name="search" />
            <span>Find your next favourite</span>
            <kbd>/</kbd>
          </NavLink>
          <NavLink
            to="/chat"
            className="header-icon"
            aria-label="Messages"
            title="Messages"
          >
            <Icon name="chat" />
          </NavLink>
          <div className="notification-anchor" ref={notificationRef}>
            <button
              ref={notificationButton}
              type="button"
              className="header-icon"
              aria-label="Notifications"
              title="Notifications"
              aria-expanded={notificationsOpen}
              aria-controls="notificationDropdown"
              onClick={() => setNotificationsOpen((value) => !value)}
            >
              <Icon name="bell" />
              <span className="notification-dot" />
            </button>
            {notificationsOpen && (
              <section id="notificationDropdown" aria-label="Notifications">
                <h2>Notifications</h2>
                {notificationsData.length ? (
                  notificationsData.map((notification, index) => (
                    <p key={index}>
                      <Icon name="chat" size={17} />
                      {notification}
                    </p>
                  ))
                ) : (
                  <p>You're all caught up.</p>
                )}
              </section>
            )}
          </div>
          <NavLink
            to="/myprofile"
            className="profile-link"
            aria-label="Your profile"
            title="Your profile"
          >
            <Icon name="user" size={20} />
          </NavLink>
        </nav>
      </header>
      <div id="sideBar_and_routeContainer">
        {!collapsed && (
          <button
            type="button"
            className="sidebar-backdrop"
            aria-label="Close navigation"
            onClick={() => setCollapsed(true)}
          />
        )}
        <aside id="sideBar">
          <div className="sidebar-heading">
            <span>YOUR SPACE</span>
            <button
              className="sidebar-toggle"
              type="button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              aria-controls="sidebar-navigation"
              onClick={() => setCollapsed((value) => !value)}
            >
              <Icon name={collapsed ? "menu" : "left"} size={18} />
            </button>
          </div>
          <nav id="sidebar-navigation" aria-label="Discover navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={item.label}
                aria-label={item.label}
                onClick={() => {
                  if (window.matchMedia("(max-width: 700px)").matches)
                    setCollapsed(true);
                }}
                className={({ isActive }) =>
                  `sideBarItems ${isActive || item.other?.includes(location.pathname) ? "is-active" : ""}`
                }
              >
                <Icon name={item.icon} size={21} />
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="sidebar-note">
              <Icon name="headphones" size={26} />
              <strong>
                Good music.
                <br />
                Better company.
              </strong>
              <p>Find the sounds and people that resonate with you.</p>
              <Link to="/exploremusic">
                Start exploring <Icon name="arrow" size={16} />
              </Link>
            </div>
            <NavLink
              to="/myprofile"
              className="sidebar-account"
              aria-label="Your profile"
              title="Your profile"
            >
              <span className="sidebar-avatar">
                <Icon name="user" size={18} />
              </span>
              <span className="sidebar-label">
                <strong>My profile</strong>
                <small>Your corner of Resonate</small>
              </span>
            </NavLink>
          </div>
        </aside>
        <section id="routeContainer" aria-label="Page content">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
export default Navbar;
