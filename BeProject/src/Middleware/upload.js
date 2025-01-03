import multer from 'multer';
import path from 'path';

// Định nghĩa nơi lưu trữ tệp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên tệp
    }
});

// Khởi tạo middleware multer
const upload = multer({ storage });

export default upload;