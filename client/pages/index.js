import { WorldIDWidget } from "@worldcoin/id";
import Head from "next/head";
import { useMoralis } from "react-moralis";
import HomeComp from "../components/HomeComp";
import LoginComp from "../components/LoginComp";

export default function Home() {
  const { isAuthenticated, Moralis } = useMoralis();
  return (
    <>
      <Head>
        <title>Blog-x</title>
        <meta name="description" content="Blog-x" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isAuthenticated ? <HomeComp /> : <LoginComp />}
        <div
          className="logout"
          onClick={() => {
            Moralis.User.logOut().then(() => {
              window.location.reload();
            });
          }}
        ></div>
      </main>
    </>
  );
}
