/**
 * @param  {import("next").NextApiRequest} req
 * @param  {import("next").NextApiResponse} res
 */
export default function getNormalNotes(req, res) {
  const page = parseInt(req.query.p) || 1;
  console.log(page);
  return res.json({});
}
