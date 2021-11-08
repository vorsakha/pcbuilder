import Head from "next/head";
import SignUp from "../components/SignUp";

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up | PCBuilder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 md:px-20 text-center">
        <SignUp />
      </main>
    </>
  );
};

export default SignUpPage;
