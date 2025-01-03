// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Tạo transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '0306221100@caothang.edu.vn',
            pass: 'grku txoj gxyb qyxy', // Thay thế bằng mật khẩu ứng dụng Gmail của bạn
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
            console.error('Error occurred:', error); // In ra lỗi chi tiết
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email đã được gửi!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});