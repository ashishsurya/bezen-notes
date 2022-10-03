import { Checkbox, FormControlLabel, Input, TextField } from '@mui/material';
import { useToasts } from 'react-toast-notifications';
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
  editable,
  _id,
  setPinnedNotes,
  setNormalNotes,
  setOpen,
}) => {
  const { addToast } = useToasts();
  // correct the input styling

  const handleButtonClick = async (e) => {
    e.preventDefault();
    // if editable we will be doing the updation and replace the current node.
    if (editable) {
      const updatePostPromise = fetch('/api/update-note', {
        method: 'POST',
        body: JSON.stringify({ _id, title, pinned, tagline, body }),
      });
    } else {
      // we will be creating the new note.
      const newPostPromise = fetch('/api/create-note', {
        method: 'POST',
        body: JSON.stringify({ title, tagline, body, pinned }),
      });
      const data = await (await newPostPromise).json();
      setOpen(false);
      if (data.note) {
        if (data.note.pinned) {
          // add note to the pinned notes if pinned
          setPinnedNotes((prev) => [data.note, ...prev]);
          addToast('Note added and pinned', { appearance: 'success' });
        } else {
          // need to add to the normal notes.
          setNormalNotes((prev) => [data.note, ...prev]);
          addToast('Note added', { appearance: 'success' });
        }
      } else if (data.error) {
        addToast('Something went wrong please try again later', {
          appearance: 'error',
        });
      }
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <form>
        <FormControlLabel
          control={
            <Checkbox
              checked={pinned}
              onChange={(_, x) => setPinned(x)}
              color='warning'
            />
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
        <button onClick={handleButtonClick}>
          {editable ? 'Save' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default PopUpModal;
