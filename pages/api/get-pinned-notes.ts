// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Note from '../../models/Note';
import connectMongoose from '../../utils/connectMongo';
import { Note as NoteType } from '../components/NoteCard';



export default async function getPinnedNotes(
  req: NextApiRequest,
  res: NextApiResponse<{notes:NoteType[]}>
) {
  console.log('CONNECTING TO MONGO');
  await connectMongoose();
  console.log('CONNECTED TO MONGO');

  const notes = await Note.find({pinned:true}).then((data) => data);
  return res.json({ notes });
}
