import Head from "next/head";
import Login from "../components/Login";

const Home = () => {
  return (
    <>
      <Head>
        <title>{"Login | PCBuilder"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </>
  );
};

export default Home;
