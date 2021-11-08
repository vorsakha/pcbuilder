import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { logOut } from "../redux/auth/slice";
import { clearBuilds } from "../redux/builds/slice";
import { useAppDispatch } from "../redux/hook";

const useLogout = (setMobileMenu: Dispatch<SetStateAction<boolean>>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearBuilds());
    localStorage.removeItem("token");

    router.push("/");

    setMobileMenu(false);
  };

  return { handleLogout };
};

export default useLogout;
