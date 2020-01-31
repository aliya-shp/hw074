const express = require('express');
const fs = require('fs');

const router = express.Router();

const date = (new Date()).toISOString();

const fileName = `./messages/${date}.txt`;

router.get('/', (req, res) => {
    res.send('List of messages');
});

router.get('/:id', (req, res) => {
    res.send('Message text');
});

router.post('/', (req, res) => {
    const message = {
        message: req.body.message,
        dateTime: date
    };
    fs.writeFileSync(fileName, req.body.message);
    res.send(message);
});

module.exports = router;