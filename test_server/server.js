const express = require('express')
const app = express();
const port = 5000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use(express.json())

require('./routes')(app);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})