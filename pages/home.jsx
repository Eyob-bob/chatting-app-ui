import Navbar from "../components/navbar";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { Avatar, Flex, Input } from "@chakra-ui/react";
import Messages from "../components/Messages";
import Footer from "../components/Footer";
import { logout } from "../feature/user/userSlice";

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
  query Query($recieverEmail: String, $senderEmail: String) {
    messages(recieverEmail: $recieverEmail, senderEmail: $senderEmail) {
      text
      senderEmail
      recieverEmail
      createdTime
    }
  }
`;

export default function Home() {
  const userAuthInfo = useSelector((state) => state.user.value);
  const router = useRouter();
  const [recieverEmail, setRecieverEmail] = useState("");
  const dispatch = useDispatch();

  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
    refetch,
  } = useQuery(GET_USER);
  const { loading, error, data } = useQuery(GET_USERS);
  const [
    getMessages,
    { loading: loadingMessages, error: errorMessages, data: dataMessages },
  ] = useLazyQuery(GET_MESSAGES);
  const [
    getMessagesReciever,
    {
      loading: loadingMessagesReciever,
      error: errorMessagesReciever,
      data: dataMessagesReciever,
    },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!userAuthInfo) {
      router.push("/");
    }
  }, [userAuthInfo]);

  useEffect(() => {
    if (error) {
      dispatch(logout());
    }
  });

  if (errorUser || error) return <p>Error</p>;
  if (loading || loadingUser) return <p>Loading</p>;

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar username={dataUser.user.username} email={dataUser.user.email} />
      <div className="min-h-screen w-screen flex justify-center">
        <div className="text-center max-w-[950px] w-[100%] flex flex-col justify-center items-center mt-20 py-10 mx-20 my-auto border md:mx-10 sm:mx-2">
          <Flex className=" w-[100%] md:flex-col p-10 py-0">
            <div className=" border md:w-full md:h-fit w-[35%] h-[60vh] overflow-y-scroll no-scrollbar px-4 py-2 flex flex-col gap-4 shadow-inner rounded-md ">
              <h1 className="font-bold text-lg">Chats</h1>
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
                        variables: {
                          senderEmail: dataUser.user.email,
                          recieverEmail: user.email,
                        },
                        pollInterval: 500,
                      });
                      getMessagesReciever({
                        variables: {
                          senderEmail: user.email,
                          recieverEmail: dataUser.user.email,
                        },
                        pollInterval: 500,
                      });
                      setRecieverEmail(user.email);
                    }}
                  >
                    <Avatar size="sm" />
                    <p>{user.username}</p>
                  </Flex>
                );
              })}
            </div>

            <div className="flex-1">
              <h1 className="font-bold text-lg">Messages</h1>
              {dataMessages && dataMessagesReciever && (
                <Messages
                  authUserEmail={dataUser.user.email}
                  recieverEmail={recieverEmail}
                  dataMessages={dataMessages}
                  dataMessagesReciever={dataMessagesReciever}
                />
              )}
            </div>
          </Flex>
        </div>
      </div>
      <Footer />
    </div>
  );
}
