import dotenv from 'dotenv';
dotenv.config(); 
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';
const authentication = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        req.user = decoded; 
        
        next();

    } catch (error) {
        console.error('Token verification error:', error); 
        return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Token is not valid.' });
    }
};

export default authentication;