
import User from '../models/User.js';


// Register Endpoint
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user without hashing the password
    const newUser = new User({
      username,
      email,
      password, // Directly save the password (not hashed)
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    res.send(req.body)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials: User not found' });
    }

    // Check password directly (no hashing)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials: Password mismatch' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
