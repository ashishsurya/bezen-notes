import { setUncaughtExceptionCaptureCallback } from 'process';
import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/PopUpModal.module.scss';
const PopUpModal = ({
  title,
  setTitle,
  tagline,
  setTagline,
  body,
  setBody,
}) => {
  // correct the input styling
  return (
    <div className={styles.modalWrapper}>
      <form>
        <input
          type='text'
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
          placeholder='Note it here'
          cols={30}
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </form>
    </div>
  );
};

export default PopUpModal;
