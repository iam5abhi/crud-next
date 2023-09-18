// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {
  const {fname,lname}=req.body;
  await xata.db.data.create({
    fname,lname
  });
  res.end();
};

export default handler;
