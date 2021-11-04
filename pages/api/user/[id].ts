import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import auth from "../../../middleware/auth";
const userModel = require("../../../models/User");

// @route api/user/:id
// @access Private
export default auth(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "DELETE":
      // @desc Delete user by id
      try {
        await dbConnect();

        const user = await userModel.findById(id);

        if (!user) {
          return res.status(400).json({ error: "No user found." });
        }

        await user.remove();

        res.json({ msg: "User removed." });

        return;
      } catch (error: any) {
        if (error)
          return res
            .status(400)
            .send({ error: { message: error.message, status: 400 } });
      }

      break;

    default:
      res
        .status(400)
        .json({ error: { message: "Wrong Method.", status: 400 } });
      break;
  }
});
