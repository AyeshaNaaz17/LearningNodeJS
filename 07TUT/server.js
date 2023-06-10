const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;


// custom middleware logger

// if defined the function in another file and exported
app.use(logger);

// cors - cross origin resource sharing
const whilelist = ['https://www.google.com', 'http://127.0.0.1:5000', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whilelist.indexOf(origin !== -1) || !origin) {
            callback(null, true);        
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStage: 200
};
app.use(cors(corsOptions));

app.use(cors());

/* --> if used directly
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t{req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
});
*/

// middleware - built-in, custom, from third party
app.use(express.urlencoded({extended: true})); // to handle url/form data

// middleware - built-in for json
app.use(express.json()); 

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

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

// app.use('/)

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.send(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({'error': "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
    
});

// app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send(err.message);
// });
// or

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});