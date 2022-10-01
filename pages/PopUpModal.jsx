import { Checkbox, FormControlLabel, Input, TextField } from '@mui/material';
import styles from '../styles/PopUpModal.module.scss';
const PopUpModal = ({
  title,
  setTitle,
  tagline,
  setTagline,
  body,
  setBody,
  pinned,
  setPinned,
  editable
}) => {
  // correct the input styling
  console.log(pinned);

  return (
    <div className={styles.modalWrapper}>
      <form>
        <FormControlLabel
          control={
            <Checkbox checked={pinned} onChange={(_, x) => setPinned(x)} />
          }
          label='Pinned'
        />

        <input
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Tagline'
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
        <textarea
          multiline
          placeholder='Note it here'
          cols={30}
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button>
          {editable ? "Save" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default PopUpModal;
