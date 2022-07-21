import Navbar from "../components/navbar";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const user = useSelector((state) => state.user.value);

  const router = useRouter();

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
        <p className="mt-20">Home</p>
      </Navbar>
    </div>
  );
}
