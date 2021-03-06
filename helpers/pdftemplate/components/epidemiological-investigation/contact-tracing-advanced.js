const components = {
  diseases: require('./diseases'),
}

const render = (data) => {
  const buildVisitedPlaces = (place) => {
    let visitedPlaces = [], visitedPlacesDoc = []
    for (i in data.histories) {
      const visitedPlace = data.histories[i][place]
      if (visitedPlaces.includes(visitedPlace) || !visitedPlace) continue

      visitedPlaces.push(visitedPlace)
      visitedPlacesDoc.push([
          { text: visitedPlace },
          { text: '-' },
          { text: '-' },
          { text: '-' },
          { text: '-' },
      ])
    }

    if (!visitedPlaces.length) {
      for (let i = 0;  i < 2; i++) {
        visitedPlacesDoc.push([
          { text: '-' },
          { text: '-' },
          { text: '-' },
          { text: '-' },
          { text: '-' },
      ])
      }
    }

    return visitedPlacesDoc
  }

  return [
    {
      // margin: [0, -15, 0, 0],
      style: 'tableClinical',
      color: '#444',
      pageBreak: 'before',
      table: {
        widths: [105, 157, 81, 65, 65],
        headerRows: 1,
        body: [
          [
            {
              text: 'D FAKTOR KONTAK/PAPARAN (lanjutan)',
              style: 'tableHeader',
              colSpan: 5,
              alignment: 'left'
            },{},{},{},{}
          ],
          [
            {
              // border: ['black', '','','black'],
              text: 'Dalam 14 hari sebelum sakit, apakah memiliki kontak erat dengan kasus pasien dalam pengawasan COVID-19?',
              colSpan: 2,
              alignment: 'left'
            },
            {},
            {
              // border: ['', '','black','black'],
              text: ': [  ] Ya   [  ] Tdk  [  ] Tdk Tahu',
              colSpan: 3,
              alignment: 'left'
            },{},{}
          ],
          [
            { text: 'Nama', style: 'tableColumnSubHeader' },
            { text: 'Alamat', style: 'tableColumnSubHeader'  },
            { text: 'Hubungan', style: 'tableColumnSubHeader'  },
            { text: 'Tgl kontak pertama', style: 'tableColumnSubHeader'  },
            { text: 'Tgl kontak terakhir', style: 'tableColumnSubHeader'  },
          ],
          ...buildVisitedPlaces('contact_pdp'),
          [
            {
              // border: ['black', '','','black'],
              text: 'Dalam 14 hari sebelum sakit, apakah memiliki kontak erat dengan kasus konfirmasi COVID-19?',
              colSpan: 2,
              alignment: 'left'
            },
            {},
            {
              // border: ['', '','black','black'],
              text: ': [  ] Ya   [  ] Tdk  [  ] Tdk Tahu',
              colSpan: 3,
              alignment: 'left'
            },{},{}
          ],
          [
            { text: 'Nama', style: 'tableColumnSubHeader' },
            { text: 'Alamat', style: 'tableColumnSubHeader'  },
            { text: 'Hubungan', style: 'tableColumnSubHeader'  },
            { text: 'Tgl kontak pertama', style: 'tableColumnSubHeader'  },
            { text: 'Tgl kontak terakhir', style: 'tableColumnSubHeader'  },
          ],
          ...buildVisitedPlaces('contact_odp'),
          [
            {
              text: 'Apakah pasien termasuk cluster ISPA berat (demam dan  pneumonia membutuhkan perawatan Rumah Sakit) yang tidak diketahui peyebabnya dimana kasus COVID-19 diperiksa?',
              colSpan: 2,
              alignment: 'left'
            },
            {},
            {
              text: ': [  ] Ya   [  ] Tdk  [  ] Tdk Tahu',
              colSpan: 3,
              alignment: 'left'
            },{},{}
          ],
          [
            {
              text: 'Apakah pasien seorang petugas kesehatan?',
              colSpan: 2,
              alignment: 'left'
            },
            {},
            {
              text: ': [  ] Ya   [  ] Tdk  [  ] Tdk Tahu',
              colSpan: 3,
              alignment: 'left'
            },{},{}
          ],
          [
            {
              text: 'Jika iya Palat pelindung diri (APD) apa yang digunakan?',
              colSpan: 2,
              alignment: 'left'
            },
            {},
            {
              text: `: [  ] Grown   [  ] Masker Medis   [  ] Sarung tangan
                : [  ] Masker NI0SH-N95, AN EU STANDARD FFP2
                : [  ] FFP3
                : [  ] Kacamata pelindung (goggle)
                : [  ] Tidak memakai APD`,
              colSpan: 3,
              alignment: 'left'
            },{},{}
          ],
          [
            {
              text: 'Apakah melakukan prosedur yang menimbulkan aerosol?',
              colSpan: 2,
              alignment: 'left'
            },
            {},
            {
              text: ': [  ] Ya   [  ] Tdk , Sebutkan ...',
              colSpan: 3,
              alignment: 'left'
            },{},{}
          ],
          [
            {
              text: 'Lain-lain, sebutkan\n.\n.',
              colSpan: 5,
              alignment: 'left'
            },
            {},{},{}
          ]
        ],
      }
    },
  ]
}

module.exports = {
  render
}