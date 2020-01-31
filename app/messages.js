const express = require('express');
const fs = require('fs');

const router = express.Router();

const path = './messages';

const data = [];

router.get('/', (req, res) => {
    const files = fs.readdirSync(path).forEach(file => {
        const fileContent = fs.readFileSync(path + '/' + file, 'utf8');
        data.push(JSON.parse(fileContent));
    });
    const result = data.slice(1).slice(-5);
    console.log(data);
    console.log(result);

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
    fs.writeFileSync(fileName, strMessage);
    res.send(message);
});

module.exports = router;