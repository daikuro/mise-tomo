import { createServer } from 'http';
import { handler } from './build/handler.js';

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const server = createServer((req, res) => {
  handler(req, res, (err) => {
    if (err) {
      res.writeHead(500);
      res.end(err.toString());
    }
  });
});

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);