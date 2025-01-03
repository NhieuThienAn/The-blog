import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url'; // Thêm dòng này

dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import userRoutes from './src/Routes/userRoutes.js';
import postRoutes from './src/Routes/postRoutes.js';
import commentRoutes from './src/Routes/commentRoutes.js';
import categoryRoutes from './src/Routes/categoryRoutes.js';
import tagRoutes from './src/Routes/tagRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({
    origin: 'http://localhost:3002',
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

// Sử dụng các route
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);

// Lấy tên file hiện tại
const __filename = fileURLToPath(import.meta.url); // Sửa lại dòng này
// Lấy đường dẫn thư mục
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Socket.io connection
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

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Start the server
server.listen(3001, () => console.log('Server listening on port 3001'));