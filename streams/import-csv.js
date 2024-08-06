import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./tasks.csv', import.meta.url);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
});

async function importCsv() {
  const parserStream = fs.createReadStream(csvPath);

  const csvParsed = parserStream.pipe(csvParse);

  for await (const row of csvParsed) {
    const [title, description] = row;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }

}

importCsv();
