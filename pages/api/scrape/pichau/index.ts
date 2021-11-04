import * as cheerio from "cheerio";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { url },
  } = req;

  switch (method) {
    case "POST":
      try {
        const response = await axios.get(url);

        const body: any = response.data;

        const $ = cheerio.load(body);

        let obj;

        const title = $("body").children().find(`h1`).text();
        const price =
          Number(
            $("body")
              .children()
              .find(".jss69")
              .map((index, element) => $(element).text())
              .toArray()[0]
              .replace("R$", "")
              .replace(",", ".")
          ) || null;
        const price2 =
          Number(
            $("body")
              .children()
              .find(".jss64")
              .map((index, element) => $(element).text())
              .toArray()[0]
              .replace("R$", "")
              .replace(",", ".")
          ) || null;
        const image = $("body")
          .children()
          .find(".carousel__inner-slide")
          .find("img")
          .attr("src");

        obj = {
          title,
          price: price || price2,
          image,
        };

        res.status(200).json(obj);
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
