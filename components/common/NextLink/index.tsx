import Link from "next/link";

type ButtonTypes = {
  href: string;
  success?: boolean;
  danger?: boolean;
  className?: string;
  click?: () => void;
};

const NextLink: React.FC<ButtonTypes> = ({
  children,
  href,
  success = true,
  danger,
  click,
  className = "",
}) => {
  return (
    <Link href={href}>
      <a
        className={`${className} ${
          success && "hover:text-blue-600 text-blue-500"
        } ${
          danger && "hover:text-gray-500 text-gray-400"
        } font-bold cursor-pointer transition-colors`}
        onClick={click}
      >
        {children}
      </a>
    </Link>
  );
};

export default NextLink;
