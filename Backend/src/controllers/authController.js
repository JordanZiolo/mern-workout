import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Token maken
const createToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// ====================
// REGISTER
// ====================
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check velden
        if (!email || !password) {
            return res.status(400).json({ error: 'Vul alle velden in' });
        }

        // 2. Check wachtwoord lengte
        if (password.length < 6) {
            return res.status(400).json({
                error: 'Wachtwoord moet minimaal 6 karakters zijn'
            });
        }

        // 3. Check of email al bestaat
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({
                error: 'Email is al in gebruik'
            });
        }

        // 4. Maak gebruiker
        const user = await User.create({ email, password });

        // 5. Maak token
        const token = createToken(user._id);

        // 6. Response
        res.status(201).json({
            email: user.email,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};

// ====================
// LOGIN
// ====================
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check velden
        if (!email || !password) {
            return res.status(400).json({
                error: 'Vul alle velden in'
            });
        }

        // 2. Zoek user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'Email of wachtwoord incorrect'
            });
        }

        // 3. Check wachtwoord
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Email of wachtwoord incorrect'
            });
        }

        // 4. Maak token
        const token = createToken(user._id);

        // 5. Response
        res.status(200).json({
            email: user.email,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};