import fs from 'fs';
import { resolve } from 'path';

export const getAllTemplateFixtures = (path) => {
  const dir = fs.readdirSync(path);
  if (!dir) return [];

  return dir.map((d) => ({ fileName: d, abs: resolve(path, d) }));
};
