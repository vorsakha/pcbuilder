import Link from "next/link";
import homeImage from "../../assets/undraw_wishlist_re_m7tv.svg";
import Image from "next/image";

const About = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-2 mt-8 md:mt-0">
      <div className="col-span-1">
        <h1 className="flex flex-col text-start mb-8 md:block md:text-6xl text-4xl font-bold">
          <span className="font-bold uppercase w-full">
            Verifique se aquela promoção é real!
          </span>
        </h1>

        <p className="text-start text-xl mb-8">
          Salve produtos e preços para serem analisados mais tarde, assim você
          sempre terá certeza de uma compra certa!
        </p>
        <p className="text-start text-xl mb-8"></p>

        <div className="w-full justify-center flex flex-row items-center">
          <div className="px-4">
            <Link href="/login">
              <a className="hover:bg-blue-600 bg-blue-500 focus:bg-blue-600  shadow-lg text-gray-200 px-6 py-2 rounded font-medium inline-block ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40">
                Login
              </a>
            </Link>
          </div>
          <div className="px-4">
            <Link href="/sign-up">
              <a className="hover:bg-blue-600 bg-blue-500 focus:bg-blue-600  shadow-lg text-gray-200 px-6 py-2 rounded font-medium inline-block ring-black ring-opacity-5 transition ease-in-out disabled:opacity-40">
                Criar Conta
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Image src={homeImage} alt="Home Image" />
      </div>
    </div>
  );
};

export default About;
