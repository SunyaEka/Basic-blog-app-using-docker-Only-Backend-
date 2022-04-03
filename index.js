const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET, SERVER_PORT } = require('./config/config');

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoute');

const app = express();

const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);

let redisClient = redis.createClient({
    url: `redis://${REDIS_URL}`,
    port: REDIS_PORT,
    legacyMode: true
})

// redisClient.on('connect', () => console.log('Connected to Redis!'));
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();


const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connection = () => {
    mongoose
    .connect(mongoUrl)
    .then(() => console.log("connected to database successfully"))
    .catch((e) => {
        console.log(e);
        setTimeout(() => {
            connection();
        }, 5000);
    })
}

connection();

//Accept some header which are added by nginx proxy.
app.enable("trust proxy");
app.use(cors({}))
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000
    }
}))

app.use(express.json()); //To attach body to the request object

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = SERVER_PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));