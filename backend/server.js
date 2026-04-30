const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
require('dotenv').config();
const auth = require('./router/auth');
const product = require('./router/product');
const order = require('./router/order');
const inquiry = require('./router/inquiry');
const connectdb = require('./config');

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const allowedOrigins = ['http://localhost:5173'];

app.use(require('cors')({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'], 
}
));

connectdb();

app.use('/api/auth',auth);
app.use('/api/product',product);
app.use('/api/order',order);
app.use('/api/inquiry',inquiry);


app.use((req, res, next) => {
    console.log(`Got request at ${req.url} with method ${req.method} from ${req.ip}`);
    next();
});

app.get('/health',(req,res)=>{
    res.status(200).send({status: 'ok',message : "Backend is running"});
});

const server = app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});

server.on ('error',(error)=>{
        console.error('Server execution error:', error);
})
