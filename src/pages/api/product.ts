import type { NextApiHandler } from "next";

import {
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../../api/product";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return createProductHandler(req, res);
    case "PATCH":
      return updateProductHandler(req, res);
    case "DELETE":
      return deleteProductHandler(req, res);
    default:
      return res.status(500).json({ error: `${req.method} is not supported!` });
  }
};

export default handler;
