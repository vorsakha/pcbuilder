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

        const availability =
          $("body").children().find(".ui-pdp-stock-information").text() || null;

        if (availability === "Estoque disponível") {
          const title = $("body").children().find(`h1`).text();
          const promo =
            $("body").children().find(`.ui-pdp-price__original-value`).text() ||
            null;
          const priceIfPromo =
            Number(
              $("body")
                .children()
                .find(".price-tag")
                .find(".price-tag-fraction")
                .map((index, element) => index === 1 && $(element).text())
                .toArray()[1]
            ) || null;
          const price =
            Number(
              $("body")
                .children()
                .find(".price-tag")
                .find(".price-tag-fraction")
                .map((index, element) => index === 0 && $(element).text())
                .toArray()[0]
            ) || null;
          const image =
            $("body")
              .children()
              .find(".ui-pdp-gallery__figure")
              .find("img")
              .attr("src") || null;

          obj = {
            availability,
            title,
            price: promo ? priceIfPromo : price,
            image,
          };
        } else {
          obj = {
            availability: "Produto fora de estoque.",
            title: null,
            price: null,
            image: null,
          };
        }

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
