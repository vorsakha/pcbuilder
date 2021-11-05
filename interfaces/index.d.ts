import { NextApiRequest } from "next";

type NextApiRequestWithUser = NextApiRequest & {
  user: {
    id: string;
  };
};

interface BuildsInterface {
  title: string;
  price: number;
  image: string;
}
