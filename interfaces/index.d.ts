import { NextApiRequest } from "next";

type NextApiRequestWithUser = NextApiRequest & {
  user: {
    id: string;
  };
};

interface BuildsInterface {
  name: string;
  build: {
    title: string;
    price: number;
    image: string;
    url: string;
  }[];
  id?: string;
}

interface LoginTypes {
  email: string;
  password: string;
}

interface ScrapeTypes {
  title: string;
  price: number;
  image: string;
  url: string;
}
