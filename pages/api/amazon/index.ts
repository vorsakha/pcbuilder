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

        const removeLineBreaks = new RegExp(/(\r\n|\n|\r)/gm);

        const title = $("body")
          .children()
          .find(`#productTitle`)
          .text()
          .replace(removeLineBreaks, "");

        const price =
          parseFloat(
            $("body")
              .children()
              .find("#priceblock_ourprice")
              .text()
              .replace("$", "")
          ) || null;
        const price2 =
          parseFloat(
            $("body").children().find(".apexPriceToPay").text().replace("$", "")
          ) || null;
        const dealPrice =
          parseFloat(
            $("body")
              .children()
              .find("#priceblock_dealprice")
              .text()
              .replace("$", "")
          ) || null;
        const availability =
          $("body")
            .children()
            .find("#availability")
            .find(".a-size-medium")
            .text()
            .replace(removeLineBreaks, "") || null;
        const image = $("body").children().find("#landingImage").attr("src");

        const obj = {
          availability,
          title,
          price: price || price2 || dealPrice,
          image,
        };

        res.status(200).json(obj);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.status(400).json({ error: "Wrong Method." });
      break;
  }
}
