import React from "react";
import { AiOutlineLoading3Quarters as Icon } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";

const LoadingSpinner = ({
  notAbsolute,
  className,
}: {
  notAbsolute?: boolean;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={`no-underline focus:outline-none ${
        notAbsolute ? `` : `absolute top-14 right-5 py-2 px-4`
      } `}
    >
      <Icon
        className={`${
          className ? className : `text-gray-700 text-2xl`
        } animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;
