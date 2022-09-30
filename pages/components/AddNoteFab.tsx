import styles from '../../styles/AddNoteFab.module.scss';

const AddNoteFab: React.FC<{createNote : () => void}> = ({createNote}) => {
  return <button className={styles.fab} onClick={createNote}>
    <span>+</span>
  </button>;
};

export default AddNoteFab;
