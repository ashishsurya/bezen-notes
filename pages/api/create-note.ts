import { NextApiRequest, NextApiResponse } from 'next';
import Note from '../../models/Note';
import connectMongoose from '../../utils/connectMongo';

export default async function createNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongoose();
  const note = await Note.create(JSON.parse(req.body));
  console.log(note)
  return res.json({note})
}
