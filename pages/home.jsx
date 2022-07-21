import Navbar from "../components/navbar";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

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
      <p className="mt-20">{data.user.username}</p>
    </div>
  );
}
