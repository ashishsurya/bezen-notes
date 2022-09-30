import { model, models, Schema } from 'mongoose';

const noteSchema = new Schema({
  title: String,
  tagline: String,
  body: String,
  pinned: Boolean,
});


const Note = models.Note || model('Note', noteSchema);


export default Note;