import { NOTES_PER_PAGE } from '..';
import Note from '../../models/Note';
import connectMongoose from '../../utils/connectMongo';

/**
 * @param  {import("next").NextApiRequest} req
 * @param  {import("next").NextApiResponse} res
 */
export default async function getNormalNotes(req, res) {
  await connectMongoose();
  const page = parseInt(req.query.p);
  console.log(page);
  try {
    const notes = await (page === 1
      ? Note.find({ pinned: false }).limit(NOTES_PER_PAGE)
      : Note.find({ pinned: false })
          .skip((page-1) * NOTES_PER_PAGE)
          .limit(NOTES_PER_PAGE));
    return res.status(200).json({ notes });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
