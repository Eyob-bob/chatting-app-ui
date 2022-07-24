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
    <div className="flex flex-col flex-1 gap-0">
      <div
        ref={msgRef}
        className="shadow-inner rounded-lg m-4 h-[50vh] overflow-scroll no-scrollbar border py-4"
      >
        <ul className="w-full flex flex-col gap-3">
          {data.length === 0 && <div>No Messages sent or recieved</div>}
          {data
            .sort((a, b) => a.createdTime - b.createdTime)
            .map((message) => {
              return message.senderEmail == authUserEmail ? (
                <div key={uuid()} className="w-full px-4 flex justify-end">
                  <p className="max-w-xs border p-2 rounded-3xl rounded-br-none bg-orange-600 text-white">
                    {message.text}
                  </p>
                </div>
              ) : (
                <div key={uuid()} className="w-full px-4 flex justify-start ">
                  <p className="max-w-xs border p-2 rounded-3xl rounded-tl-none bg-gray-500 text-white">
                    {message.text}
                  </p>
                </div>
              );
            })}
        </ul>
      </div>
      <SendMessageForm
        senderEmail={authUserEmail}
        recieverEmail={recieverEmail}
      />
    </div>
  );
};

export default Messages;
