import { Avatar, Flex } from "@chakra-ui/react";
import React from "react";

export default function Sidebar({ users, userData }) {
  return (
    <div className="w-[35%] h-[60vh] overflow-y-scroll px-4 py-2 flex flex-col gap-4 ">
      {users.map((user) => {
        if (user.email === userData.email) return;
        return (
          <Flex
            boxShadow="0 0 1px "
            padding="2"
            borderRadius="md"
            justifyContent="start"
            alignItems="center"
            gap=".5rem"
            onClick={() => {}}
          >
            <Avatar size="sm" />
            <p>{user.username}</p>
          </Flex>
        );
      })}
    </div>
  );
}
