import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "../../../interfaces";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

const userModel = require("../../../models/User");
import dbConnect from "../../../db/connect";

// @route api/user/auth
// @access Public
export default async function handler(
  req: NextApiRequestWithUser,
  res: NextApiResponse
) {
  const {
    method,
    body: { email, password },
  } = req;

  switch (method) {
    // @desc Log user
    case "POST":
      try {
        await dbConnect();

        const user = await userModel.findOne({ email });

        if (!user) {
          res.status(401).json({ errors: [{ msg: "Invalid Credentials." }] });
          return;
        }

        // If user found check if password matches
        compare(password, user.password, function (err, result) {
          if (!result || err) {
            res.status(401).json({ errors: [{ msg: "Invalid Credentials." }] });
          } else {
            // Return jsonwebtoken
            const payload = {
              user: {
                id: user.id,
              },
            };

            sign(
              payload,
              process.env.JWT_SECRET as string,
              { expiresIn: 3600 },
              (err: any, token) => {
                if (err) throw err;
                res.status(200).json({
                  user: user.email,
                  admin: user.admin,
                  token,
                });
              }
            );
          }
        });
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
}
