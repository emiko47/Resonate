  import { Outlet } from 'react-router-dom';

  function Navbar() {
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
            <button type='button'><img width="30" height="30" src="https://img.icons8.com/fluency-systems-regular/48/user-male-circle--v1.png" alt="user-male-circle--v1"/></button>
          </nav>
        </header>
        <div id='sideBar_and_routeContainer'>
          <nav id='sideBar' aria-label='Discover navigation'>
            <button className='sideBarItems' type='button'>Explore Music</button>
            <button className='sideBarItems' type='button'>Communities</button>
            <button className='sideBarItems' type='button'>Events</button>
            <button className='sideBarItems' type='button'>My Collections</button>
          </nav>
          <section id='routeContainer'>
            <Outlet />
          </section>
        </div>
      </main>
    );
  }

  export default Navbar;
