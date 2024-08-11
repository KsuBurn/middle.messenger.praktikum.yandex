import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const _rootname = _dirname + '/dist';

app.use(express.static('dist'));

app.use('*', (req, res) => {
    let template = fs.readFileSync(
        path.resolve(_rootname, 'index.html'),
        'utf-8',
    );
    res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
