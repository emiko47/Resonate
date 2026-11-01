  import { NavLink, Outlet, useLocation } from 'react-router-dom';

  function Navbar() {
    const sideBarItems = [
      {to: '/exploremusic', label: 'Explore Music'},
      {to: '/communities', label: 'Communities'},
      {to: '/events', label: 'Events'},
      {to: '/mycollections', label: 'My Collections'}
    ];
  
    const location = useLocation();

    return (
      <main id='fullPage'>
        <header id='topBar'>
          <nav id='leftPart' aria-label='Primary navigation'>
            <button type='button'><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/chat.png" alt="chat"/></button>
            <button type='button'><img width="30" height="30" src="https://img.icons8.com/ios/50/home--v1.png" alt="home--v1"/></button>
            <button type='button'><img width="30" height="30" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/></button>
          </nav>
          <div id='centerPart'>
            <h1>Resonate</h1>
          </div>
          <nav id='rightPart' aria-label='Account navigation'>
            <button type='button'><img width="30" height="30" src="https://img.icons8.com/ios/50/appointment-reminders--v1.png" alt="appointment-reminders--v1"/></button>
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
                fontWeight: location.pathname.startsWith(item.to) ? "600" : "400"
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
      </main>
    );
  }

  export default Navbar;
