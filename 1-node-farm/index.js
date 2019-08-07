const fs = require('fs');
const http = require('http');
const url = require('url');

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
const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathname = req.url;

  switch (pathname) {
    case '/':
    case '/overview':
      res.end('This is the overview');
    case '/product':
      res.end('This is the PRODUCT');
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
