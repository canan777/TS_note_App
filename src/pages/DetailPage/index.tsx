import { Link, useOutletContext } from 'react-router-dom';
import { Note } from '../../types';
import { Badge, Col, Row, Stack, Button } from 'react-bootstrap';
import Markdown from 'react-markdown';

type DetailProps = {
  deleteNote: (id: string) => void;
};

const DetailPage = ({ deleteNote }: DetailProps) => {
  // parent route'dan context propu ile gönderilen
  // veriler erişmek için kullandığımız method
  const found: Note = useOutletContext();

  return (
    <div className="container py-5">
      <Row>
        <Col>
          <h1>{found.title}</h1>

          <Stack direction="horizontal" gap={3} className="flex-wrap">
            {found.tags.map((tag) => (
              <Badge key={tag.value}>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>

        <Col>
          <Stack
            direction="horizontal"
            gap={2}
            className="align-items-center justify-content-end"
          >
            <Link to={'edit'}>
              <Button>Düzenle</Button>
            </Link>

            <Button onClick={() => deleteNote(found.id)} variant="danger">
              Sil
            </Button>

            <Link to={'/'}>
              <Button variant="secondary">Geri</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      {/* markdown içeriği ekrana bas */}
      <Markdown className={'my-5'}>{found.markdown}</Markdown>
    </div>
  );
};

export default DetailPage;