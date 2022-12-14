const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socket = require('socket.io');
const userRoutes = require("./routes/userRoute");
const messagesRoutes = require("./routes/messagesRoute");
const { MONGO_URI, CLIENT_URI } = require('./config/keys');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/message', messagesRoutes);


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected Successfully.")
}).catch((err) => {
    console.log(err.message);
});


if(process.env.NODE_ENV == 'production'){
    const path = require('path');

    app.get('/', (req, res) => {
        // app.use(express.static(path.resolve(__dirname, 'client', 'build')))
        // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        res.json("backend is working perfectly.")
    })
}


let port = process.env.PORT;
const server = app.listen(port || 5000, () => {
    console.log(`Server is started on Port ${process.env.PORT || 5000}`);
});

//  SOCKET.IO: work for establishing real-time chat rendering and sending/receiving
const io = socket(server, {
    cors: {
        origin: "https://hommies-chat.netlify.app",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});