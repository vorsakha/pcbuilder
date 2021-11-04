import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "../../../interfaces";
import { hash } from "bcrypt";
const userModel = require("../../../models/User");
import dbConnect from "../../../db/connect";

// @route api/user
// @access Public
const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    // @desc Create user
    case "POST":
      try {
        await dbConnect();

        const userExists = await userModel.findOne({ name: req.body.name });

        if (userExists) {
          res.status(400).send("User already exists.");
          return;
        }

        const { email, password } = req.body;
        hash(password, 10, async (err: any, hash: string) => {
          const newUser = new userModel({
            email: email,
            password: hash,
            admin: req.body.admin || false,
          });

          const user = await newUser.save();

          res.status(200).json(user);
        });
      } catch (error: any) {
        if (error)
          return res
            .status(400)
            .send({ error: { message: error.message, status: 400 } });
      }

      break;

    // @desc Get user by token
    // todo - if needed
    case "GET":
      // try {
      //   await dbConnect();

      //   const user = await userModel.findById(req.user.id).select("-password");

      //   res.status(200).json(user);
      // } catch (error: any) {
      //   res.status(400).json({ error: error.message });
      // }
      break;

    default:
      res
        .status(400)
        .json({ error: { message: "Wrong Method.", status: 400 } });
      break;
  }
};

export default handler;
