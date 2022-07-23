import { Avatar, Flex } from "@chakra-ui/react";
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-[35%] h-[60vh] overflow-y-scroll px-4 py-2 flex flex-col gap-4 ">
      <Flex
        boxShadow="0 0 1px "
        padding="2"
        borderRadius="md"
        justifyContent="start"
        alignItems="center"
        gap=".5rem"
      >
        <Avatar size="sm" />
        <p>Name</p>
      </Flex>
      <Flex
        boxShadow="0 0 1px "
        padding="2"
        borderRadius="md"
        justifyContent="start"
        alignItems="center"
        gap=".5rem"
      >
        <Avatar size="sm" />
        <p>Name</p>
      </Flex>
      <Flex
        boxShadow="0 0 1px "
        padding="2"
        borderRadius="md"
        justifyContent="start"
        alignItems="center"
        gap=".5rem"
      >
        <Avatar size="sm" />
        <p>Name</p>
      </Flex>
      <Flex
        boxShadow="0 0 1px "
        padding="2"
        borderRadius="md"
        justifyContent="start"
        alignItems="center"
        gap=".5rem"
      >
        <Avatar size="sm" />
        <p>Name</p>
      </Flex>
    </div>
  );
}
