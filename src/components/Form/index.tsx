import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { v4 } from 'uuid';
import { Tag } from '../../types';
import { CreatePageProps } from '../../pages/CreatePage';

const CustomForm = ({
  availableTags,
  createTag,
  handleSubmit,
  title = '',
  tags = [],
  markdown = '',
}: CreatePageProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  // useRef ile input ve textArea'yı çağır
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  // note'u lokale kaydet
  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // note oluştur
    handleSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    // bir önceki sayfaya yönlendir
    navigate(-1);
  };

  return (
    <Form onSubmit={handleSend}>
      <Stack>
        {/* üst kısım */}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                defaultValue={title}
                ref={titleRef}
                required
                className="shadow"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etiketler</Form.Label>
              <CreatableSelect
                // @ts-ignore varolan etiketlerden biri değiştiğinde çalışır
                onChange={(all_tags) => setSelectedTags(all_tags)}
                // yeni etiket oluşturulduğunda çalışır
                onCreateOption={(text) => {
                  // etiket objesi oluştur ve id ekle
                  const newTag: Tag = { label: text, value: v4() };

                  // yeni etiketi lokale kaydet
                  createTag(newTag);

                  // state'e yeni etiketi ekle
                  setSelectedTags([...selectedTags, newTag]);
                }}
                // daha önce oluşturlan etiketleri listele
                options={availableTags}
                // seçili etiketleri
                value={selectedTags}
                className="text-black shadow"
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>

        {/* içerik alanı */}
        <Form.Group className="mt-4">
          <Form.Label>İçerik (markdown destekler)</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as="textarea"
            className="shadow"
            style={{ minHeight: '300px', maxHeight: '500px' }}
          />
        </Form.Group>

        {/* butonlar */}
        <Stack
          direction="horizontal"
          gap={4}
          className="justify-content-end mt-5"
        >
          <Button type="submit">Kaydet</Button>
          <Button
            onClick={() => navigate(-1)} //geçmişte bir adım geri gönder
            type="button"
            variant="secondary"
          >
            Geri
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CustomForm;