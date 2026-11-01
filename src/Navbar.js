  import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
  import { useState, useRef, useEffect } from 'react';
  import ReactDOM from 'react-dom';
  import "./cssfiles/navbar.css";
  import { calculateDropdownPosition } from './Functions';

  import { notificationsData } from './mockdata/Notifications';

  function Navbar() {
    const sideBarItems = [
      {to: '/exploremusic', label: 'Explore Music', other: []},
      {to: '/communities', label: 'Communities', other: ['/createcommunity', '/createpost']},
      {to: '/events', label: 'Events', other: []},
      {to: '/mycollections', label: 'My Collections', other: []}
    ];
  
    const location = useLocation();

    const [notifDropdownIsVisible, setNotifDropdownIsVisible] = useState(false);
    const [notifDropdownPosition, setNotifDropdownPosition] = useState({
      left: "0px",
      top: "0px"
    });
    const notifDropdownRef = useRef(null);
    useEffect(() => {
      function handleClickOutside(event) {
        if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
          setNotifDropdownIsVisible(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <main id='fullPage'>
        <header id='topBar'>
          <nav id='leftPart' aria-label='Primary navigation'>
            <NavLink to='/chat'>
              <button type='button'><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/chat.png" alt="chat"/></button>
            </NavLink>
            <Link to="/" aria-label="Home">
              <button type='button'><img width="30" height="30" src="https://img.icons8.com/ios/50/home--v1.png" alt="home--v1"/></button>
            </Link>
            <NavLink to='/search'>
              <button type='button'><img width="30" height="30" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/></button>
            </NavLink>
          </nav>
          <div id='centerPart'>
            <h1>Resonate</h1>
          </div>
          <nav id='rightPart' aria-label='Account navigation'>
            <button type='button' onClick={(event) => {
              const newPosition = calculateDropdownPosition(event);
              setNotifDropdownPosition(newPosition);
              setNotifDropdownIsVisible(true);
            }}>
              <img width="30" height="30" src="https://img.icons8.com/ios/50/appointment-reminders--v1.png" alt="appointment-reminders--v1"/>
            </button>
            <button type='button'><img width="30" height="30" src="https://img.icons8.com/ios/50/settings--v1.png" alt="settings--v1"/></button>
            <NavLink to='/myprofile'>
              <button type='button'><img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/48/user-male-circle--v1.png" alt="user-male-circle--v1"/></button>
            </NavLink>
          </nav>
        </header>
        <div id='sideBar_and_routeContainer'>
          <nav id='sideBar' aria-label='Discover navigation'>
            {sideBarItems.map((item) => {
              const buttonStyle = {
                fontWeight: location.pathname.startsWith(item.to) || item.other.includes(location.pathname) ? "600" : "400"
              };
              return (
                <NavLink className='sideBarItems' style={buttonStyle} to={item.to}>{item.label}</NavLink>
              );
            })}
          </nav>
          <section id='routeContainer'>
            <Outlet />
          </section>
        </div>
        {notifDropdownIsVisible && ReactDOM.createPortal(
          <div id="notificationDropdown" style={notifDropdownPosition} ref={notifDropdownRef}>
            {notificationsData.map((notification) => {
              return <p>{notification}</p>;
            })}
          </div>, document.body
        )}
      </main>
    );
  }

  export default Navbar;
