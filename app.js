const { error } = require('console');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const dataArr = []; // Dizi oluşturuldu

app.post('/', (req, res) => {
  var msj = req.body.msj;
  var date = req.body.date;
  var telefon = req.body.number;

  var data = {
    telefon:telefon,
    mesaj: msj,
    date: date
  };

  dataArr.push(data); // Veri nesnesi dizinin sonuna eklendi

  fs.writeFile('veriler.json', JSON.stringify(dataArr), (err) => {
    if (err) {
      console.error('Dosyaya yazma hatası:', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });

  console.log(JSON.stringify(data));
  function goBackToHTML() {
    window.location.href = 'index.html'; // Geri dönülecek HTML dosyasının yolunu belirtin
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
