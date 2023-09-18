import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { id } = req.body;
  await xata.db.data.delete(id);
  res.send();
};

export default handler;