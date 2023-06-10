import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const port = 8080;

app.get('/task', (req: Request, res: Response) => {
  const data = fs.readFileSync('mock_task.json', 'utf-8');
  res.json(JSON.parse(data));
});

app.get('/member', (req: Request, res: Response) => {
  const data = fs.readFileSync('mock_member.json', 'utf-8');
  res.json(JSON.parse(data));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});