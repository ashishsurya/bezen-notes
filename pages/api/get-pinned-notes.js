// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Note from '../../models/Note';
import connectMongoose from '../../utils/connectMongo';

export default async function getPinnedNotes(req, res) {
  console.log('CONNECTING TO MONGO');
  await connectMongoose();
  console.log('CONNECTED TO MONGO');

  try {
    const notes = await Note.find({ pinned: true }).then((data) => data);
    return res.json({ notes });
  } catch (error) {
    return res.json({ notes: [], error: error.message });
  }
}
