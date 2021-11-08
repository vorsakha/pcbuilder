import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { loadUser, logUser } from "../redux/auth/thunk";
import { useAppDispatch, useAppSelector } from "../redux/hook";

// Types //
type LoginTypes = {
  email: string;
  password: string;
};

const useLogin = () => {
  const [formInput, setFormInput] = useState<LoginTypes>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formInput.email !== "" || formInput.password !== "") {
      dispatch(logUser(formInput));
    }
  };

  const handleLoadUser = useCallback(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { loggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const handleIsLogged = useCallback(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn]); // eslint-disable-line

  return {
    handleSubmit,
    handleInputChange,
    formInput,
    handleLoadUser,
    handleIsLogged,
  };
};

export default useLogin;
