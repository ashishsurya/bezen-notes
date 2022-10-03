import Note from "../../models/Note";
/**
 * @param  {import("next").NextApiRequest} req
 * @param  {import("next").NextApiResponse} res
 */
export default async function updateNote(req, res) {
  const { id, ...updateData } = req.body;
  // try {
  //   await Note.findByIdAndUpdate(id, updateData)
  //   const 
  // } catch (error) {
    
  // }
}
