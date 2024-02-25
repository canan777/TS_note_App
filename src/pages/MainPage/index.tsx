import { Button, Col, Row, Stack, Form } from 'react-bootstrap';
import { Note, Tag } from '../../types';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import ReactSelect from 'react-select';
import Card from '../../components/Card';

type MainPageProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ availableTags, notes }: MainPageProps) => {
  const [title, setTitle] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  /*
   1) Not başlığı aranan metni içermelidir. Eğer aranan 
   metin boş ise koşul sağlanır. Aksi takdirde note'un başlığının
   küçük hafe çevrilmiş hali aratılan metnin küçük hafe çevrilmiş 
   halini ieriyorsa koşul sağlanır. Buda büyük küçük harf 
   duyarlılığını ortadan kaldırır. 

   2) Seçişmiş etiketler ile notun etiketleri birebir eşleşmeldir.
   Eğer seçilen etiket yok ise koşul sağlanır. Aksi takdirde seçilen
   etiketler dizisindeki her etiket için, notun etiketleri arasında
   eşleşme kontrol edeilir.
   every fonksiyonu, tüm seçilmmiş etiketlerin notun etiketleri arasında
   olup olmadığınmı kontrol eder
  */
  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          //1) note'un başlığı aratılan metni içeriyorsa note'u döndür
          (title === '' ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          //2) seçtiğim etiketlerin tamamı notta varsa note'u döndür
          (selectedTags.length === 0 ||
            selectedTags.every((s_tag) =>
              note.tags.some((noteTag) => noteTag.value === s_tag.value)
            ))
        );
      }),
    [title, selectedTags, notes]
  );

  return (
    <div className="container py-5">
      {/* üst kısım */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notlar</h1>

        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      {/* filtreleme kısım */}
      <Form className="mt-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                className="shadow"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect // @ts-ignore varolan etiketlerden biri değiştiğinde çalışır
                onChange={(all_tags) => setSelectedTags(all_tags)}
                // daha önce oluşturlan etiketleri listele
                options={availableTags}
                isMulti
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* not listesi */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col>
            <Card key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;