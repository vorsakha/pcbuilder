import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useLogin from "../../hooks/useLogin";
import { useAppSelector } from "../../redux/hook";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";

const Login: React.FC = () => {
  const { loading, user } = useAppSelector((state) => state.auth);

  const { handleSubmit, handleInputChange, formInput } = useLogin();

  let router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 md:px-20 text-center">
      <div className="w-full max-w-md mt-6">
        <form
          className="shadow-lg rounded border px-6 sm:px-12 pt-6 pb-8 mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          {loading && <LoadingSpinner />}
          <h1 className="text-2xl flex justify-center py-2 mb-4">Login</h1>
          <input
            className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => handleInputChange(e)}
            value={formInput.email}
            required
            autoComplete="email"
          />
          <input
            className="shadow text-gray-700  appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleInputChange(e)}
            value={formInput.password}
            required
            autoComplete="current-password"
          />
          <div className="flex justify-center mt-2">
            <Button success disabled={loading} type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
