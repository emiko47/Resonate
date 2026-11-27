import BackButton from "./BackButton";
import { useState } from "react";
import "./cssfiles/profile.css";
import "./cssfiles/commoncomponents.css"
import { TagList } from "./CommonComponents"

import { defaultUser } from "./mockdata/Users";


function Profile() {
  const [genres, updateGenres] = useState(defaultUser.genres);

  const artistsList = [];
  for (let i=0; i<3; i++) {
    artistsList.push(<li>
      <input type="text" placeholder="Click to add an artist" value={defaultUser.topArists[i]}/>
    </li>);
  }

  const sharingLevels = [
    {level: "city", label: "City"},
    {level: "province", label: "Province"},
    {level: "country", label: "Country"},
    {level: "none", label: "None"}
    
  ]
  let index = sharingLevels.findIndex(sl => sl.level === defaultUser.location.shareLevel);
  if (index === -1) {
    index = 3;
  }
  const [levelIndex, updateLevelIndex] = useState(index);

  return (
    <div id="profileRoot">
      <BackButton to="/" label="Back to home" className="grid-screen-back"/>
      <div id="profileLeft">
        {/* Profile picture */}
        <div id="profilePictureCol">
          <img id="profilePicture" width="100%" src="https://img.icons8.com/dusk/64/headphones.png" alt="profile"/>
          <input type="file" />
          <button class="profileNegativeButton">
            Clear picture
          </button>
        </div>
        {/* Buttons */}
        <div id="profileButtonsCol">
          <button class="profilePositiveButton">
            Save changes
          </button>
          <button class="profileNegativeButton">
            Discard changes
          </button>
        </div>
      </div>
      <div id="profileRight">
        {/* Name */}
        <div>
          <h2>Display name</h2>
          <div id="profileNameRow">
            <input type="text" value={defaultUser.displayname}/>
            <span>(@{defaultUser.username})</span>
          </div>
        </div>
        <div id="profileBioLocationRow">
          {/* Bio */}
          <div id="profileBioCol">
            <h2>Bio</h2>
            <textarea id="profileBio" value={defaultUser.bio}/>
          </div>
          {/* Location */}
          <div id="profileLocationCol">
            <h2>Location</h2>
            <div id="profileLocationPartsCol">
              <button id="profileLocationSetRow" class="iconButton">
                <img width="32" height="32" src="https://img.icons8.com/external-bearicons-outline-color-bearicons/64/external-Target-navigation-and-maps-bearicons-outline-color-bearicons.png" alt="locate"/>
                <span>Set with device location</span>
              </button>
              <input type="text" placeholder="City" value="Calgary" />
              <input type="text" placeholder="Province" value="Alberta" />
              <input type="text" placeholder="Country" value="Canada" />
            </div>
            <h2>Sharing Level</h2>
            <div id="profileLocationSharingButtons">
              {sharingLevels.map((sharingLevel, index) => {
                const buttonStyle = {
                  borderWidth: levelIndex === index ? "2px" : "0px"
                };
                return (
                  <button class="profileLevelButton" key={index} onClick={() => updateLevelIndex(index)} style={buttonStyle}>
                    {sharingLevel.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div id="profileGenresAristsRow">
          {/* Genres */}
          <div>
            <h2>Genres</h2>
            <TagList names={genres} editableCallback={updateGenres} creatable={true} />
          </div>
          {/* Artists */}
          <div>
            <h2>Recommended artists</h2>
            <ol id="profileArtistsList">
              {artistsList}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile