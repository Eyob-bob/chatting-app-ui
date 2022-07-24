import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import SendMessageForm from "./SendMessageForm";

const Messages = ({
  dataMessages,
  dataMessagesReciever,
  authUserEmail,
  recieverEmail,
}) => {
  const data = [...dataMessages.messages, ...dataMessagesReciever.messages];
  const msgRef = useRef(null);

  useEffect(() => {
    msgRef.current.scrollTop = msgRef.current.scrollHeight;
  });

  return (
    <div
      ref={msgRef}
      className="flex-1 relative shadow-md rounded-lg m-4 h-[60vh] overflow-scroll"
    >
      <ul className="w-full flex flex-col gap-3">
        {data
          .sort((a, b) => a.createdTime - b.createdTime)
          .map((message) => {
            return message.senderEmail == authUserEmail ? (
              <div key={uuid()} className="w-full px-4 flex justify-end">
                <p className=" w-fit">{message.text}</p>
              </div>
            ) : (
              <div key={uuid()} className="w-full px-4 flex justify-start">
                <p className=" w-fit">{message.text}</p>
              </div>
            );
          })}
      </ul>
      <SendMessageForm
        senderEmail={authUserEmail}
        recieverEmail={recieverEmail}
      />
    </div>
  );
};

export default Messages;
