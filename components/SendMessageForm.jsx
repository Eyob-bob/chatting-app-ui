import { gql } from "@apollo/client";
import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const SAVE_MESSAGE = gql`
  mutation Mutation($saveMessageInput: SaveMessageInput) {
    saveMessage(saveMessageInput: $saveMessageInput) {
      createdTime
      text
      senderEmail
      recieverEmail
    }
  }
`;

const SendMessageForm = () => {
  const [typedMessage, setTypedMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTypedMessage("");
      }}
      className="flex justify-center items-center gap-2"
    >
      <Input
        onChange={(e) => setTypedMessage(e.target.value)}
        type="text"
        className="fixed bottom-0 my-4"
        value={typedMessage}
      />
      <Button type="submit" variant="outline" colorScheme={"blue"}>
        Send
      </Button>
    </form>
  );
};

export default SendMessageForm;
