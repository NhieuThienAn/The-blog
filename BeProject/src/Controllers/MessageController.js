import Message from '../Models/Message';

// Gửi tin nhắn
export const sendMessage = async (req, res) => {
    const { receiver, message } = req.body;
    const sender = req.user.id; // Lấy ID người gửi từ token

    try {
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();

        // Gửi tin nhắn đến socket.io
        req.io.emit('chat message', { sender, receiver, message });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tin nhắn giữa 2 người dùng
export const getMessages = async (req, res) => {
    const { user1, user2 } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).populate('sender receiver'); // Lấy thông tin người gửi và nhận

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};