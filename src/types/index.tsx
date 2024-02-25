// formdan alınan note verisnin tipi
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

// state'de tutulacak note versinin tipi
// notedata verisini miras alıp üzreine yeni değer ekledik
export type Note = {
  id: string;
} & NoteData;

export type Tag = {
  label: string;
  value: string;
};

// type'taki bütün değerlerin opsiyonel olmasını istiyorsak
// Partial kullanıp opsiyonel olmasını istedğimiz tipi
// generic olarak gönderiririz
// interface Test {
//   text: string;
// }
// const note: Partial<Test> = {};