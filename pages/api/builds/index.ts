import { NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import auth from "../../../middleware/auth";
const buildModel = require("../../../models/Build");

// @route api/builds
// @access Private

export default auth(async (req: any, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      // @desc Create build
      try {
        await dbConnect();

        const { build, name } = req.body;

        const newBuild = new buildModel({
          user: req.user.id,
          name,
          build,
        });

        // Save build
        const savedBuild = await newBuild.save();

        res.send(savedBuild);
      } catch (error: any) {
        if (error)
          return res
            .status(400)
            .send({ error: { message: error.message, status: 400 } });
      }

      break;

    case "GET":
      // @desc Get all user builds by date
      try {
        await dbConnect();

        const builds = await buildModel.find({ user: req.user.id }).sort({
          date: -1,
        });

        res.status(200).send(builds);
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
