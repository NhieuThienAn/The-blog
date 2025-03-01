import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url'; 
import userRoutes from './src/Routes/UserRoutes.js';
import postRoutes from './src/Routes/PostRoutes.js';
import commentRoutes from './src/Routes/CommentRoutes.js';
import categoryRoutes from './src/Routes/CategoryRoutes.js';
import tagRoutes from './src/Routes/TagRoutes.js';
import nodemailer from 'nodemailer'; 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(morgan("common"));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '0306221100@caothang.edu.vn',
            pass: 'grku txoj gxyb qyxy', 
        },
    });

    const mailOptions = {
        from: email,
        to: 'hhyu03096@gmail.com',
        subject: `Liên hệ từ ${name}`,
        text: `Tên: ${name}\nEmail: ${email}\nSố điện thoại: ${phone}\nTin nhắn: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error); 
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email đã được gửi!');
    });
});

// Start the server
server.listen(3001, () => console.log('Server listening on port 3001'));