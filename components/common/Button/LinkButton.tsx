import Link from "next/link";

const LinkButton: React.FC<{ href: string; className?: string }> = ({
  children,
  href,
  className = "",
}) => {
  return (
    <Link href={href}>
      <a
        className={`hover:bg-blue-600 bg-blue-500 focus:bg-blue-600 inline-block shadow-lg text-gray-200 px-6 py-2 rounded font-medium ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40 ${className}`}
      >
        {children}
      </a>
    </Link>
  );
};

export default LinkButton;
