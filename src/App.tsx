import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import MainPage from './pages/MainPage/index';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Note, NoteData, Tag } from './types';
import { v4 } from 'uuid';
import Layout from './components/Layout/index';

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notess', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('tagss', []);

  // yeni etiket oluşturma
  const createTag = (tag: Tag): void => {
    setTags((prev) => [...prev, tag]);
  };

  // yeni note oluşturma > id sini ekle
  const createNote = (noteData: NoteData): void => {
    // objeye id özelliği ekle
    const newNote: Note = {
      id: v4(),
      ...noteData,
    };

    // state'e yeni note'u ekle
    setNotes((prev) => [...prev, newNote]);
  };

  // note'u sil
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // note'u güncelle
  const updateNote = (id: string, updatedData: NoteData) => {
    // güncellenecek note'un state'de tuttuğumuz halini bulacağız
    // diziden onu kaldırıp yerine güncel halini koyacağız
    const updated = notes.map((note) =>
      note.id == id
        ? {
            id,
            ...updatedData,
          }
        : note
    );

    // state'i güncelle
    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <CreatePage
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/:id" element={<Layout notes={notes} />}>
          <Route
            index // /id route'dayken bu route devreye girsin
            element={<DetailPage deleteNote={deleteNote} />}
          />
          <Route
            path="edit"
            element={
              <EditPage
                availableTags={tags}
                createTag={createTag}
                onSubmit={updateNote}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;