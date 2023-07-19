const fs = require('fs');

fs.readFile('./veriler.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Hata:', err);
        return;
    }

    const veri = JSON.parse(data);

    let htmlString = '';

    veri.forEach(element => {
        const mesaj = element.mesaj;
        const date = element.date;
        const sendtime = element.sendtime;

        // Her bir öğe için HTML dizesi oluşturun.
        const elementHtml = `
            <p><strong>Mesaj:</strong> ${mesaj}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Send Time:</strong> ${sendtime}</p>
            <hr>
        `;

        // HTML dizesini ana dizeye ekleyin.
        htmlString += elementHtml;
    });

    // JSON verilerini HTML içine ekleyin ve dosyaya yazın.
    fs.writeFile('./index.html', htmlString, (err) => {
        if (err) {
            console.error('Dosyaya yazma hatası:', err);
            return;
        }
        console.log('JSON verileri HTML dosyasına yazıldı.');
    });
});
