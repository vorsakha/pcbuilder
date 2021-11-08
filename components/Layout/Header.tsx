import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu as HamburgerIcon } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { MdClose as CloseIcon } from "@react-icons/all-files/md/MdClose";
import { useAppSelector } from "../../redux/hook";
import useLogout from "../../hooks/useLogout";
import NextLink from "../common/NextLink";
import Button from "../common/Button";
import { GiBinoculars as LogoIcon } from "@react-icons/all-files/gi/GiBinoculars";

const Header: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const { loggedIn } = useAppSelector((state) => state.auth);

  const { handleLogout } = useLogout(setMobileMenu);

  return (
    <nav className="min-w-screen h-14 px-4">
      <div className="w-full flex flex-row justify-between items-center m-auto h-14 max-w-screen-lg border-b border-gray-200">
        <Link href="/">
          <a className="flex items-center md:text-2xl md:pl-4 uppercase font-bold text-xl text-blue-500">
            <LogoIcon className="mr-2 text-4xl" />
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
          <NextLink
            className="sm:mr-8 w-full py-4 sm:w-auto"
            success
            href="/"
            click={() => setMobileMenu(false)}
          >
            {loggedIn ? "Dashboard" : "Home"}
          </NextLink>
          {!loggedIn && (
            <NextLink
              className=" w-full py-4 sm:w-auto"
              success
              href="/login"
              click={() => setMobileMenu(false)}
            >
              Login
            </NextLink>
          )}
          {loggedIn && (
            <>
              <NextLink
                className="w-full sm:w-auto py-4"
                success
                href="/my-builds"
                click={() => setMobileMenu(false)}
              >
                Minhas Builds
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
            <Link href="/sign-up">
              <a
                onClick={() => setMobileMenu(false)}
                className="md:ml-8 mt-4 md:mt-0 hover:bg-blue-600 bg-blue-500 focus:bg-blue-600  shadow-lg text-gray-200 px-6 py-2 rounded font-medium inline-block ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40"
              >
                Criar Conta
              </a>
            </Link>
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
