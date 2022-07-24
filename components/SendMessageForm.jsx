import { gql, useMutation, useQuery } from "@apollo/client";
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

const SendMessageForm = ({ senderEmail, recieverEmail }) => {
  const [typedMessage, setTypedMessage] = useState("");
  const [saveMessage, { loading, data, error }] = useMutation(SAVE_MESSAGE);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveMessage({
          variables: {
            saveMessageInput: {
              text: typedMessage,
              senderEmail,
              recieverEmail,
            },
          },
        });
        setTypedMessage("");
      }}
      className="flex items-center gap-2 m-2 "
    >
      <Input
        placeholder="type and hit send"
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
