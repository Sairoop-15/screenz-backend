import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields as necessary
});

// Check if the model already exists
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
