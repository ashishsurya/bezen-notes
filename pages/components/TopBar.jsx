import Image from 'next/image';
import styles from '../../styles/TopBar.module.scss';
const TopBar = () => {
  return (
    <div className={styles.topbar}>
      <Image
        src='https://img.icons8.com/color/48/000000/google-keep.png'
        alt=''
        width='48px'
        height={'48px'}
      />
      <h2>Keep your Notes</h2>
    </div>
  );
};

export default TopBar;
