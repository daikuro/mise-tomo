import { createServer } from 'http';
import { handler } from './build/handler.js';

const port = parseInt(process.env.PORT || '8080', 10);
const host = process.env.HOST || '0.0.0.0';

console.log(`Starting server with PORT=${port}, HOST=${host}`);

const server = createServer((req, res) => {
  handler(req, res, (err) => {
    if (err) {
      console.error('Request handler error:', err);
      res.writeHead(500);
      res.end(err.toString());
    }
  });
});

server.listen(port, host, () => {
  console.log(`Server successfully listening on http://${host}:${port}`);
  console.log('Server is ready to accept connections');
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`${signal} signal received: closing HTTP server`);
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown('unhandledRejection');
});