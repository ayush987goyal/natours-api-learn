const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

//////////////////////////////////////////
////////// FILES

// Blocking sync way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// Non-blocking, async way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('Error!');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);

//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('File written!');
//       });
//     });
//   });
// });
// console.log('Will read file!');

//////////////////////////////////////////
////////// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const temProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case '/':
    case '/overview': {
      const cardsHtml = dataObj
        .map(el => replaceTemplate(tempCard, el))
        .join('');
      const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(output);
      break;
    }

    case '/product': {
      const product = dataObj[query.id];
      const output = replaceTemplate(temProduct, product);

      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(output);
      break;
    }

    case '/api':
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(data);
      break;

    default:
      res.writeHead(404, {
        'Content-ype': 'text/html',
        'custom-header': 'hello-world!'
      });
      res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '0.0.0.0', () =>
  console.log('Listening to requests on port 8000')
);
