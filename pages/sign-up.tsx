import Head from "next/head";
import SignUp from "../components/SignUp";

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up | PCBuilder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignUp />
    </>
  );
};

export default SignUpPage;
