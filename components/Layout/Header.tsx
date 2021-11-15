import Link from "next/link";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hook";
import useLogout from "../../hooks/useLogout";
import NextLink from "../common/NextLink";
import Button from "../common/Button";
import LinkButton from "../common/Button/LinkButton";
import { CloseIcon, HamburgerIcon } from "../common/Icons";

const Header: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const { loggedIn } = useAppSelector((state) => state.auth);

  const { handleLogout } = useLogout(setMobileMenu);

  return (
    <nav className="min-w-screen h-20 px-4 font-cairo">
      <div className="w-full flex flex-row justify-between items-center m-auto h-20 max-w-screen-lg border-b border-gray-200">
        <Link href="/">
          <a className="flex items-center md:text-4xl md:pl-4 font-tech uppercase font-bold text-3xl text-blue-500">
            PCBuilder
          </a>
        </Link>
        <div
          className={`${
            mobileMenu
              ? "absolute bg-white flex flex-column flex-wrap mt-14 right-0 top-0 py-8 w-screen text-center justify-center overflow-hidden text-xl border-b border-blue-500 shadow-sm z-50"
              : "hidden"
          } sm:flex sm:flex-row sm:justify-end items-center`}
        >
          {!loggedIn && (
            <>
              <NextLink
                className="sm:mr-8 w-full py-4 sm:w-auto"
                success
                href="/"
                click={() => setMobileMenu(false)}
              >
                Home
              </NextLink>
              <NextLink
                className=" w-full py-4 sm:w-auto"
                success
                href="/login"
                click={() => setMobileMenu(false)}
              >
                Login
              </NextLink>
            </>
          )}
          {loggedIn ? (
            <Button
              danger
              click={handleLogout}
              className="w-full my-4 sm:w-auto md:ml-8 mr-4 ml-4"
            >
              Logout
            </Button>
          ) : (
            <LinkButton
              onClick={() => setMobileMenu(false)}
              className="md:ml-8 mt-4 md:mt-0"
              href="/sign-up"
            >
              Criar Conta
            </LinkButton>
          )}
        </div>
        <div className="flex align-center sm:hidden">
          <button
            className={`${mobileMenu ? "hidden" : "block"}`}
            onClick={() => setMobileMenu(true)}
          >
            <HamburgerIcon className="text-2xl text-blue-500" />
          </button>
          <button
            className={`${mobileMenu ? "block" : "hidden"}`}
            onClick={() => setMobileMenu(false)}
          >
            <CloseIcon className="text-2xl text-blue-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
