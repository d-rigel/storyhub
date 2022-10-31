// require('dotenv').config();
// import { port } from './config';
import config from 'config';
import app from './app';

const port = config.get<number>('port');

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port} ... `);
});

process.on('SIGTERM', () => server.close());
