const Card: React.FC = ({ children }) => {
  return (
    <li className="border w-full h-24 col-span-1 flex flex-row gap-4 shadow-md hover:shadow-lg transition ease-in-out rounded py-5 px-6">
      {children}
    </li>
  );
};

export default Card;
