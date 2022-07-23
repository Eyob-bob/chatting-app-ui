import Navbar from "../components/navbar";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Sidebar from "../components/Sidebar";
import { Flex, Input } from "@chakra-ui/react";
import Messages from "../components/Messages";

const GET_USER = gql`
  query Query {
    user {
      username
      email
    }
  }
`;

export default function Home() {
  const userAuthInfo = useSelector((state) => state.user.value);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (!userAuthInfo) {
      router.push("/");
    }
  }, [userAuthInfo]);

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading</p>;

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar username={data.user.username} email={data.user.email} />
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
            <Sidebar />
            <Messages />
          </Flex>
        </div>
      </div>
    </div>
  );
}
