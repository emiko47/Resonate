import { useNavigate } from 'react-router-dom';
import './cssfiles/createpost.css';

function CreatePost() {
  const navigate = useNavigate();
  return (
    <div id="createPostRoot">
      <div id="createPostTitleArea">
        <div id="createPostTitleRow">
          <span>Title:</span>
          <span id="createPostCommunityLabel">Calgary Rap</span>
        </div>
        <input type="text" />
      </div>
      <div id="createPostDescriptionBox">
        <span>Content:</span>
        <textarea id="createPostDescriptionText" />
      </div>
      <div id="createPostActionsRow">
        <button id="createPostCreateButton" onClick={() => {
          navigate("../communities/example/123");
        }}>Create</button>
        <button id="createPostDiscardButton" onClick={() => {
          navigate("../communities/example");
        }}>Discard</button>
      </div>
    </div>
  )
}

export default CreatePost;