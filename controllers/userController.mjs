import { User } from '../models/User.mjs';

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users fetched successfully!', data: users });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: true });
    }
};

// Add a new user
export const addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully!', data: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error adding user', error: true });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', error: true });
        }
        res.status(200).json({ message: 'User updated successfully!', data: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: true });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: true });
    }
};
