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

            return res.send(user);
          }

          return res.json({ msg: "No token provided" });
        } catch (error: any) {
          if (error)
            return res
              .status(400)
              .send({ error: { message: error.message, status: 400 } });
        }

      default:
        res
          .status(400)
          .json({ error: { message: "Wrong Method.", status: 400 } });
        break;
    }
  }
);
