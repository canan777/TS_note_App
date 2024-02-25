# filtreleme algoritması

1) Not başlığı aranan metni içermelidir. Eğer aranan 
   metin boş ise koşul sağlanır. Aksi takdirde note'un başlığının
   küçük harfe çevrilmiş hali aratılan metnin küçük harfe çevrilmiş 
   halini içeriyorsa koşul sağlanır. Bu da büyük-küçük harf 
   duyarlılığını ortadan kaldırır. 

2) Seçilmiş etiketler ile notun etiketleri birebir     eşleşmeldir.
   Eğer seçilen etiket yok ise koşul sağlanır. Aksi takdirde seçilen
   etiketler dizisindeki her etiket için, notun etiketleri arasında
   eşleşme kontrol edeilir.
   every fonksiyonu, tüm seçilmmiş etiketlerin notun etiketleri arasında
   olup olmadığınmı kontrol eder

  ...javascript
   const filtredNotes = notes.filter((note) => {
  return (
    //1) note'un başlığı aratılan metni içeriyorsa note'u döndür
    (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
    //2) seçtiğim etiketlerin tamamı notta varsa note'u döndür
    (selectedTags.length === 0 ||
      selectedTags.every((s_tag) =>
        note.tags.some((noteTag) => noteTag.value === s_tag.value)
      ))
  );
});
...

 # TS_note_App
