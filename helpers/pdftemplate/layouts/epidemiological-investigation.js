const layout = {
    header: [
        {
            text: 'FORMULIR PENYELIDIKAN EPIDIOMOLOGI',
            style: 'header'
        },
        {
            text: 'CORONAVIRUS DISEASE (COVID-19)',
            style: 'header'
        }
    ],
    subheader: [
        {
            style: 'subheader',
            text: 'Nama Fasyankes : '
        },
        {
            columns: [
                { text: 'Nama Pewawancara : ' },
                { text: 'Tanggal Wawancara : '}
            ]
        },
        {
            columns: [
                { text: 'Tempat Tugas : '},
                { text: 'HP Pewawancara : '}
            ]
        }
    ],
    footnoteSectionOne: [
      {
        margin: [10, -5, 0, 0],
        text: '*) Diisi sesuai dengan defenisi operasional (lihat pedoman)'
      },
      {
        style: 'footnote',
        text: '**) Nomor ID (pasien) : (kode kota/kab permendagri <3 digit nomor urut)'
      },
      {
        style: 'footnote',
        text: '***) Oksigenasi membran ekstrakorporea'
      },
    ],
    footer: [
      {
        style: 'footer',
        margin: [10, 10, 0, 0],
        bold: true,
        text: 'KETERANGAN'
      },
      {
        style: 'footer',
        margin: [15, 0, 0, 0],
        text: '- Diisi sesuai dengan defenisi operasional (lihat pedoman)'
      },
      {
        style: 'footer',
        margin: [10, 10, 0, 0],
        bold: true,
        text: 'INSTRUKSI'
      },
      {
        style: 'footer',
        margin: [15, 0, 0, 0],
        text: '- Semua pernyataan dalam formulir ini harus diisi, tidak boleh ada pertanyaan apapun yang kosong/tidak terjawab'
      },
      {
        style: 'footer',
        margin: [15, 0, 0, 0],
        text: '- Untuk pertanyaan dengan pilihan jawaban "Ya/Tidak/Tidak Tahu", pilih salah satu jawaban saja'
      },
    ],
    styles: {
        footnote: {
          fontSize: 9,
          margin: [10, 0, 0, 0]
        },
        footer: {
          fontSize: 9
        },
        header: {
          fontSize: 13,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          margin: [0, 10, 0, 0],
        },
        tableExample: {
          margin: [0, 5, 0, 0]
        },
        tableClinical: {
          margin: [0, 0, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black',
          fillColor: '#e6e6e6'
        },
        tableSubHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        },
        tableColumnSubHeader: {
          bold: true,
          fontSize: 10,
          color: 'black',
          fillColor: '#e6e6e6'
        }
      },
      defaultStyle: {
        fontSize: 10
        // alignment: 'justify'
      }
}

module.exports = layout