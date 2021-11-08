import React from "react";
import useLogon from "../../hooks/useLogon";
import { useAppSelector } from "../../redux/hook";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";

const SignUp = () => {
  const { loading } = useAppSelector((state) => state.user);

  const { formInput, handleInputChange, handleSubmit } = useLogon();

  return (
    <div className="w-full mx-auto max-w-md mt-6">
      <form
        className="shadow-lg rounded border px-12 pt-6 pb-8 mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        {loading && <LoadingSpinner />}
        <h1 className="text-2xl flex justify-center py-2 mb-4">Sign Up</h1>
        <input
          className="shadow text-gray-700 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
          type="email"
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
        <input
          className="shadow text-gray-700  appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring ring-1 ring-black ring-opacity-5 mb-2"
          type="password"
          name="password2"
          placeholder="Repeat Password"
          onChange={(e) => handleInputChange(e)}
          value={formInput.password2}
          required
          autoComplete="current-password"
        />
        <div className="flex justify-center mt-2">
          <Button success disabled={loading} type="submit">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
