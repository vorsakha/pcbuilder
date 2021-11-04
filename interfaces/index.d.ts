import { NextApiRequest } from "next";

type NextApiRequestWithUser = NextApiRequest & {
  user: {
    id: string;
  };
};
