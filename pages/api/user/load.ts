import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../middleware/auth";
const userModel = require("../../../models/User");

interface NextApiRequestWithUser extends NextApiRequest {
  user?: {
    id?: string;
  };
}

// @route api/user/load
// @access Public
export default auth(
  async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
      // @desc Get user by token
      case "GET":
        try {
          if (req.user) {
            const user = await userModel
              .findById(req.user.id)
              .select("-password");

            res.status(200).send(user);
            return;
          }

          res.status(401).send({ msg: "No token provided" });
        } catch (error: any) {
          throw error.message;
        }

      default:
        res
          .status(401)
          .json({ error: { message: "Wrong Method.", status: 400 } });
        break;
    }
  }
);
