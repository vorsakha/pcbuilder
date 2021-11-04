import { NextApiResponse } from "next";
import dbConnect from "../../../db/connect";
import auth from "../../../middleware/auth";
const Build = require("../../../models/Build");

// @route api/build/:id
// @access Private

export default auth(async (req: any, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "DELETE":
      // @desc Delete build by id
      try {
        await dbConnect();

        const build = await Build.findById(id);

        if (!build) {
          return res.status(404).json({ msg: "Build not found." });
        }

        await build.remove();

        const builds = await Build.find({ user: req.user.id }).sort({
          date: -1,
        });

        if (builds.length === 0) {
          res
            .status(200)
            .send({ success: { status: 200, msg: "Build deleted." } });
        } else {
          res
            .status(200)
            .send({ success: { status: 200, msg: "Build deleted." }, builds });
        }

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
