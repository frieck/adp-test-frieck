const http = require('http');
const fs = require('fs');
const Perform = require('./src/perform');

const port = 4000;

/**
 * Create the server
 * There are two separated 'routes":
 * * '/events' for the EventSource
 * * '/ ' or fallback to serve a index.html file
 *
 */
const server = http.createServer((req, res) => {
  // if the URL match '/events' serve the EventSource performing a calculation every 500ms.
  if (req.url.match(/\/events/)) {
    // Preparing request and response to serve as a event-stream
    req.socket.setNoDelay(true);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
    });

    // Return a calculation every 500ms
    const perform = new Perform();
    setInterval(() => {
      perform.run().then((data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      });
    }, 500);
  } else {
    // Serve an ordinary HTML file.
    fs.readFile('index.html', (_, data) => {
      res.writeHead(200);
      res.end(data);
    });
  }
});

server.listen(port);
// eslint-disable-next-line no-console
console.log(`Http server listening on http://localhost:${port}`);
