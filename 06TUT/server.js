const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;

// app.get('^/$|/index.html(.html)?', (req, res)
app.get('/', (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    // res.sendFile('./views/index.html', {root: __dirname });
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); // 302 by default
});

// Route handlers 

app.get('/hello(.html)?', (req, res, next) => {
    console.log("Attempted to load .html file");
    next(); // if u have next function
}, (req, res) => {
    res.send("Hello World!");
});

// chaining route handlers

const one = (req, res, next) => {
    console.log("One");
    next();
}

const two = (req, res, next) => {
    console.log("Two");
    next();
}

const three = (req, res, next) => {
    console.log("Three");
    res.send("Finished!");
}

app.get('/chain(.html)?', [one, two, three]);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});