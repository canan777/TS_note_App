import { useOutletContext } from 'react-router-dom';
import Form from '../../components/Form';
import { Note, NoteData, Tag } from '../../types';

type EditNoteProps = {
  onSubmit: (id: string, updatedData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditPage = ({ onSubmit, createTag, availableTags }: EditNoteProps) => {
  const found: Note = useOutletContext();

  return (
    <div className="container py-5">
      <h2>Note'u Düzenle</h2>
      <Form
        handleSubmit={(updatedNote) => onSubmit(found.id, updatedNote)}
        availableTags={availableTags}
        createTag={createTag}
        title={found.title}
        markdown={found.markdown}
        tags={found.tags}
      />
    </div>
  );
};

export default EditPage;
