import React from "react";

const Messages = ({ dataMessages }) => {
  return (
    <div className="flex-1 shadow-md rounded-lg m-4">
      <ul>
        {dataMessages.messages.map((message) => {
          return <li>{message.text}</li>;
        })}
      </ul>
    </div>
  );
};

export default Messages;
