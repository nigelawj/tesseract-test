const tesseract = require('node-tesseract-ocr');

// DEFAULT CONFIG
const config = {
  lang: 'eng',
  oem: 1,
  psm: 3
};

// TEST DRIVER FUNCTION
const test = async filename => {
  const hrstart = process.hrtime();
  await tesseract
    .recognize(filename, config)
    .then(text => {
      text = text.replace(/[\r\n\t\f]/gm, ' ');
      console.log('Result:', text);
    })
    .catch(err => {
      console.log(err.message);
    });
  hrend = process.hrtime(hrstart);
  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
};

// RUN THEM SEPARATELY!

//test('./images/congress.jpg');

//test('./images/crankshaft.jpg');

//test('./images/eng_bw.png');

//test('./images/flow-diagram.png');

//test('./images/flow-diagram-small.png');

//test('./images/mindfulness.jpg');
test('\\\\Desktop-rpp633o\\d$\\Code\\tesseract-test\\images\\mindfulness.jpg');

//test('./images/mindfulness-small.jpg');

//test('./images/quickbrownfox.png');

//test('./images/telegram.jpg');

//test('./images/twinkle.jpg');
