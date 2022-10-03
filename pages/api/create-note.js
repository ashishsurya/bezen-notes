import Note from '../../models/Note';
import connectMongoose from '../../utils/connectMongo';

export default async function createNote(req, res) {
  try {
    await connectMongoose();
    const note = await Note.create(JSON.parse(req.body));
    return res.json({ note });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
