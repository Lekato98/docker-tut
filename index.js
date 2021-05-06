const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    SESSION_SECRET,
    REDIS_URL,
    REDIS_PORT,
} = require('./config/config');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
});


const app = express();
const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/userRoutes');

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

app.enable('trust-proxy');
app.use(cors({}));
app.use(express.json());
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30 * 1000,
    },
}));

mongoose.connect(mongoURI, mongoOptions)
    .then(() => console.log('mongoose connected!'))
    .catch(err => console.log(err.message));


app.get('/api', (req, res) => {
    res.send('<h2>Hello, World :D</h2>');
    console.log('yo')
});

app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening to ${port}`));
