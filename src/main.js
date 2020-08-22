const port = 9999;

const express = require('express');
const bodyParser = require('body-parser');

let server = null;

let app = express();

app.use(express.json({ limit: '50000kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Sample Project
const { sampleProject } = require('./SampleProject');

// Handle all errors if they are not handled in their respective endpoint
process.on('unhandledRejection', (reason) => {
    throw reason;
});

process.on('uncaughtException', (reason) => {
    let finalReason = reason;

    if (typeof reason === 'object') {
        try {
            finalReason = JSON.stringify(reason);
        } catch (error) {
            finalReason = `Cannot stringify error object with keys: ${Object.keys(reason).join(', ')}`;
        }
    }

    console.log(`Node encountered with following error: ${finalReason}`, 'Node2General');
});

// Handle Sample Project POST Requests
app.post('/sampleProject', (req, res) => {
    sampleProject(req.body, res);
});

const callbacks = {
    testListener: f => f
};

const listenCallback = () => {
    console.log(`Node is listening on port: ${port}`);
    callbacks.testListener();
};

server = app.listen(port, listenCallback);

module.exports = {
    callbacks,
    server
}