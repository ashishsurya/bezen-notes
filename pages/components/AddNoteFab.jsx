import styles from '../../styles/AddNoteFab.module.scss';

const AddNoteFab = ({createNote}) => {
  return <button className={styles.fab} onClick={createNote}>
    <span>+</span>
  </button>;
};

export default AddNoteFab;
