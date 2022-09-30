import styles from '../../styles/NoteCard.module.scss';
import PinOutlineIcon from './PinOutlineIcon';
import PinSolidIcon from './PinSolidIcon';

const NoteCard = ({ note, handleOpenNote }) => {
  return (
    <div className={styles.notecard} onClick={() => handleOpenNote(note)}>
      <div className={styles.notecard__header}>
        <h3>{note.title}</h3>
        {note.pinned ? <PinSolidIcon /> : <PinOutlineIcon />}
      </div>
      <small>{note.tagline}</small>
      <p>{note.body}</p>
    </div>
  );
};

export default NoteCard;
