import Navbar from "../components/navbar";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import Sidebar from "../components/Sidebar";
import { Avatar, Flex, Input } from "@chakra-ui/react";
import Messages from "../components/Messages";

const GET_USER = gql`
  query Query {
    user {
      username
      email
    }
  }
`;
const GET_USERS = gql`
  query Query {
    users {
      email
      username
    }
  }
`;
const GET_MESSAGES = gql`
  query Query($recieverEmail: String) {
    messages(recieverEmail: $recieverEmail) {
      text
    }
  }
`;

export default function Home() {
  const userAuthInfo = useSelector((state) => state.user.value);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [messages, setMessages] = useState([]);

  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_USER);
  const { loading, error, data } = useQuery(GET_USERS);
  const [
    getMessages,
    { loading: loadingMessages, error: errorMessages, data: dataMessages },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    console.log(dataMessages || "");
  }, [dataMessages]);

  useEffect(() => {
    if (!userAuthInfo) {
      router.push("/");
    }
  }, [userAuthInfo]);

  if (errorUser || error) return <p>Error</p>;
  if (loading || loadingUser) return <p>Loading</p>;

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar username={dataUser.user.username} email={dataUser.user.email} />
      <div className="min-h-screen w-screen flex justify-center">
        <div className="text-center max-w-[760px] w-[100%] flex flex-col justify-center items-center mt-20 py-10 mx-20 my-auto border md:mx-10 sm:mx-2">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            width="50%"
            placeholder="Search with name"
            mb={6}
          />
          <Flex className=" w-[100%]">
            <div className="w-[35%] h-[60vh] overflow-y-scroll px-4 py-2 flex flex-col gap-4 ">
              {data.users.map((user) => {
                if (user.email === dataUser.user.email) return;
                return (
                  <Flex
                    key={user.email}
                    boxShadow="0 0 1px "
                    padding="2"
                    borderRadius="md"
                    justifyContent="start"
                    alignItems="center"
                    gap=".5rem"
                    className="hover:cursor-pointer"
                    onClick={() => {
                      getMessages({
                        variables: { recieverEmail: "gqexxgr@hi2.in" },
                      });
                    }}
                  >
                    <Avatar size="sm" />
                    <p>{user.username}</p>
                  </Flex>
                );
              })}
            </div>
            {dataMessages && <Messages dataMessages={dataMessages} />}
          </Flex>
        </div>
      </div>
    </div>
  );
}
