import NoteCard, { Note } from './NoteCard';
import styles from '../../styles/NotesWrapper.module.scss';

const NotesWrapper: React.FC<{
  title: string;
  notes: Note[];
  handleOpenNote: (note: Note) => void;
}> = ({ title, notes, handleOpenNote }) => {
  return (
    <div className={styles.noteswrapper}>
      <h1>{title}</h1>
      <div className={styles.notescontainer}>
        {notes.map((note) => (
          <NoteCard
            note={note}
            key={note._id}
            handleOpenNote={handleOpenNote}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesWrapper;
