import { Modal } from '@mui/material';
import Head from 'next/head';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.scss';
import connectMongoose from '../utils/connectMongo';
import AddNoteFab from './components/AddNoteFab';
import NotesWrapper from './components/NotesWrapper';
import TopBar from './components/TopBar';
import PopUpModal from './PopUpModal';
import Note from '../models/Note';
import PrevIcon from '../pages/components/PrevIcon';
import NextIcon from '../pages/components/NextIcon';
import { useToasts } from 'react-toast-notifications';

export const NOTES_PER_PAGE = 6;

const Home = ({
  serverSideCount,
  serverSidePageCount,
  serverSidePinnedNotes,
  serverSideNormalNotes,
}) => {
  const renders = useRef(0);
  const { addToast } = useToasts();
  const [pinnedNotes, setPinnedNotes] = useState(
    JSON.parse(serverSidePinnedNotes)
  );
  const [normalNotes, setNormalNotes] = useState(
    JSON.parse(serverSideNormalNotes)
  );
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(serverSidePageCount);
  const [count, setCount] = useState(serverSideCount);
  const [editable, setEditable] = useState(false);

  // pop-up modal state
  const [_id, _setId] = useState('');
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [body, setBody] = useState('');
  const [pinned, setPinned] = useState(false);
  //used as handle for fab button
  const handleOpenNewNote = () => {
    setTitle('');
    setTagline('');
    setBody('');
    setPinned(false);
    setEditable(false);
    setOpen(true);
  };

  // handler when clicked on note
  const handleOpenNote = (note) => {
    setTitle(note.title);
    setTagline(note.tagline);
    setBody(note.body);
    setPinned(note.pinned);
    _setId(note._id);
    setEditable(true);
    setOpen(true);
  };

  const fetchPaginatedNormalNotes = useCallback(async () => {
    const reqPromise = fetch(`/api/get-normal-notes?p=${page}`);
    const data = await (await reqPromise).json();
    if (data.error) {
      addToast('Something went wrong', { appearance: 'error' });
    } else if (data.notes) {
      setNormalNotes(data.notes);
    }
  }, [addToast, page]);

  useEffect(() => {
    if (renders === 0) return;
    else {
      renders++;
      fetchPaginatedNormalNotes();
    }
  }, [fetchPaginatedNormalNotes, page]);

  const handleClose = () => setOpen(false);

  const handleNextPageClick = () => {
    setPage(function (prev) {
      if (prev === pageCount) return prev;
      return prev + 1;
    });
  };

  const handlePrevPageClick = () => {
    setPage((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Keep Your Notes</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <TopBar />
        <AddNoteFab createNote={handleOpenNewNote} />
        {pinnedNotes && pinnedNotes.length > 0 && (
          <NotesWrapper
            title='Pinned Notes'
            notes={pinnedNotes}
            handleOpenNote={handleOpenNote}
          />
        )}
        {normalNotes && normalNotes.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 20,
            }}
          >
            <NotesWrapper
              title='Notes'
              notes={normalNotes}
              handleOpenNote={handleOpenNote}
            />
            <div>
              <button
                disabled={page === 1}
                title='go to prev page'
                onClick={handlePrevPageClick}
              >
                <PrevIcon />
              </button>
              <button
                disabled={page === pageCount}
                title='go to next page'
                onClick={handleNextPageClick}
              >
                <NextIcon />
              </button>
            </div>
          </div>
        )}
        <Modal open={open} onClose={handleClose}>
          <PopUpModal
            title={title}
            setTitle={setTitle}
            tagline={tagline}
            setTagline={setTagline}
            body={body}
            setBody={setBody}
            editable={editable}
            pinned={pinned}
            setPinned={setPinned}
            _id={_id}
            setPinnedNotes={setPinnedNotes}
            setOpen={setOpen}
            setNormalNotes={setNormalNotes}
          />
        </Modal>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  await connectMongoose();
  const notesSize = await Note.estimatedDocumentCount();
  const pinnedNotes = await Note.find({ pinned: true });
  const normalNotes = await Note.find({ pinned: false }).limit(NOTES_PER_PAGE);
  const count = notesSize - pinnedNotes.length;
  const pageCount = Math.ceil(count / NOTES_PER_PAGE);
  return {
    props: {
      serverSidePinnedNotes: JSON.stringify(pinnedNotes),
      serverSideNormalNotes: JSON.stringify(normalNotes),
      serverSideCount: count,
      serverSidePageCount: pageCount,
    },
  };
}

export default Home;
