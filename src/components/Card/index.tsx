import { Badge, Card, Stack } from 'react-bootstrap';
import { Note } from '../../types';
// module scss dosyasını import ettiğimiz zaman bir style
// nesnesi elde ederiz
import styles from './card.module.css';
import { useNavigate } from 'react-router-dom';

type CardType = {
  note: Note;
};

const NoteCard = ({ note }: CardType) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/${note.id}`)} className={styles.noteCard}>
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-between h-100"
        >
          <span className="fw-bold">{note.title}</span>

          <Stack
            direction="horizontal"
            className="justify-content-center"
            gap={2}
          >
            {note.tags.map((tag) => (
              <Badge>{tag.label}</Badge>
            ))}
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;