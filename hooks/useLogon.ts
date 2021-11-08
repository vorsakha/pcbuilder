import { useState } from "react";
import { generateAlert } from "../redux/alert/slice";
import { useAppDispatch } from "../redux/hook";
import { signUp } from "../redux/user/thunk";

// Types
type SignUpTypes = {
  email: string;
  password: string;
  password2: string;
};

const useLogon = () => {
  const [formInput, setFormInput] = useState<SignUpTypes>({
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useAppDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (formInput.email !== "" || formInput.password !== "") {
      if (formInput.password === formInput.password2) {
        dispatch(signUp(formInput));
      } else {
        dispatch(
          generateAlert({ type: "DANGER", msg: "Passwords don't match" })
        );
      }
    }
  };

  return { formInput, handleInputChange, handleSubmit };
};

export default useLogon;
