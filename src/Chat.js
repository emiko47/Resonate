import BackButton from "./BackButton";
import { useState } from "react";
import "./cssfiles/chat.css";
import { formatTimeAgo, formatTimeAgoOrDate } from "./Functions";

import { chats } from "./mockdata/Chat";


function Chat() {
  const [chatIndex, updateChatIndex] = useState(0);

  return (
    <div id="chatRoot">
      <BackButton to="/" label="Back to home" className="grid-screen-back"/>
      <div id="chatLeft">
        <div id="chatList">
          {chats.map((chat, index) => {
            const lastMessage = chat.messages.at(-1);
            return (
              <button class="chatButton" key={index} onClick={() => updateChatIndex(index)}>
                <div class="chatButtonHeaderRow">
                  <span class="chatButtonName">{chat.username}</span>
                  <span class="chatButtonTime">{formatTimeAgo(lastMessage.time)}</span>
                </div>
                <p class="chatButtonMessage">{lastMessage.direction === "in" ? chat.username : "You"}: {lastMessage.message.substring(0, 80)}</p>
              </button>
            );
          })}
        </div>
        <button id="chatNewButton">
          New Chat
        </button>
      </div>
      <div id="chatRight">
        <div id="chatMessages">
          {chats[chatIndex].messages.map((message) => {
            const messageStyle = {
              alignSelf: message.direction === "in" ? "flex-start" : "flex-end",
              alignItems: message.direction === "in" ? "flex-start" : "flex-end"
            };
            return (
              <div class="chatMessage" style={messageStyle}>
                <span>{formatTimeAgoOrDate(message.time)}</span>
                <p>{message.message}</p>
              </div>
            )
          })}
        </div>
        <div id="messageReplyRow">
          <input type="text" placeholder="Type your message" />
          <button class="iconButton">
            <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/sent.png" alt="send message"/>
          </button>
        </div>
      </div>
    </div>
  )
}


export default Chat;
