// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  const {id, fname,lname}=req.body;
  const results = await xata.db.data.createOrUpdate(id,{
    fname, 
    lname, 
  });
  res.send(results);
};

export default handler;
