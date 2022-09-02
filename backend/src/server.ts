import { port } from './config';
import app from './app';

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} ... `);
});

process.on('SIGTERM', () => server.close());
