import Navbar from "../components/navbar";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USER = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      token
    }
  }
`;

export default function Home() {
  const user = useSelector((state) => state.user.value);

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userId: "62d7f5ab385068e9a68ddd8c" },
  });

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user) return <p>Redirecting...</p>;

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Navbar>
        <p className="mt-20">{JSON.stringify(data)}</p>
      </Navbar>
    </div>
  );
}
