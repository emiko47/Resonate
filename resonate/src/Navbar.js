  import { Outlet } from 'react-router-dom';

  function Navbar() {
    return (
      <main id='fullPage'>
        <header id='topBar'>
          <nav id='leftPart' aria-label='Primary navigation'>
            <button type='button'>Chat</button>
            <button type='button'>Home</button>
            <button type='button'>Search</button>
          </nav>
          <div id='centerPart'>
            <h1>Resonate</h1>
          </div>
          <nav id='rightPart' aria-label='Account navigation'>
            <button type='button'>Notifications</button>
            <button type='button'>Settings</button>
            <button type='button'>Profile</button>
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
