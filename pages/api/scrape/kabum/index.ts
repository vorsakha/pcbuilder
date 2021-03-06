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

        const unavailable =
          $("body").children().find("#formularioProdutoIndisponivel").text() ||
          null;

        let obj;

        if (!unavailable) {
          const title = $("body").children().find(`h1`).text();
          const priceRaw: any = $("#blocoValores")
            .children()
            .find("b")
            .map((index, element) => index === 3 && $(element).text())
            .toArray()[3];
          const price =
            Number(
              priceRaw
                .replace("R$", "")
                .replace(".", "")
                .replace(",", ".")
                .trim()
            ) || null;

          const image = $("body")
            .children()
            .find(".selectedImage")
            .find("img")
            .attr("src");

          obj = {
            availability: "Em estoque.",
            title,
            price,
            image,
            url,
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
