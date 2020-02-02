const express = require('express');
const fs = require('fs');

const router = express.Router();

const path = './messages';

const data = [];

router.get('/', (req, res) => {
    const files = fs.readdir(path, (err, files) => {
        files.forEach(file => {
            fs.readFile(path + '/' + file, (err, fileContent) => {
                if (err) throw err;
                data.push(JSON.parse(fileContent));
            })
        })
    });
    const result = data.slice(1).slice(-5);
    res.send(result);
});

router.get('/:id', (req, res) => {
    res.send('Message text');
});

router.post('/', (req, res) => {
    const date = (new Date()).toISOString();
    const fileName = `./messages/${date}.txt`;
    const message = {
        message: req.body.message,
        dateTime: date
    };
    const strMessage = JSON.stringify(message);
    fs.writeFile(fileName, strMessage, 'utf8',(err) => {
        if (err) throw err;
    });
    res.send(message);
});

module.exports = router;