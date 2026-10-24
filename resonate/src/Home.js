import './cssfiles/home.css';

function Home() {
  return (
    <div id='fullPage'>


      <div id='topBar'>
        <div id='leftPart'><p>Chat</p><p>Home</p><p>Search</p></div>
        <div id='centerPart'><h1>Resonate</h1></div>
        <div id='rightPart'><p>Notifications</p><p>Settings</p><p>Profile</p></div>
      </div>


      <div id='mainContent'>

        <div id='leftSide'>
            <div className='leftSideItems'><p>Explore Music</p></div>
            <div className='leftSideItems'><p>Communities</p></div>
            <div className='leftSideItems'><p>Events</p></div>
            <div className='leftSideItems'><p>My Collections</p></div>
        </div>

        <div id='rightSide'>

        </div>





      </div>
    </div>
  );
}

export default Home;