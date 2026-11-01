import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cssfiles/createcommunity.css';
import { TagList } from './CommonComponents';

function CreateCommunity() {
  const [genres, updateGenres] = useState([]);
  const navigate = useNavigate();
  return (
    <div id="createCommunityRoot">
      <div id="createCommunityTitleRow">
        <span>Community name:</span>
        <input type="text" />
      </div>
      <div id="createCommunitySubtitleRow">
        <span>Community URL:</span>
        <code><span>https://www.localhost.com/communities/</span><b>example</b></code>
      </div>
      <div id="createCommunityTagsRow">
        <span>What genre(s) will this community discuss?</span>
        <TagList names={genres} editableCallback={updateGenres} creatable={true} />
      </div>
      <div id="createCommunityDescriptionBox">
        <span>Brief description of the community:</span>
        <textarea id="createCommunityDescriptionText" />
      </div>
      <div id="createCommunityActionsRow">
        <button id="createCommunityCreateButton" onClick={() => {
          navigate("../communities/example");
        }}>Create</button>
        <button id="createCommunityDiscardButton" onClick={() => {
          navigate("../communities");
        }}>Discard</button>
      </div>
    </div>
  )
}

export default CreateCommunity;