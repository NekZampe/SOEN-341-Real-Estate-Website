import express from 'express';
import { User } from '../models/usermodel.js';
import { hashPassword, comparePassword } from '../helpers/auth.cjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

const userRouter = express.Router();

const createToken = ({ _id, name, email, u_type }) => {
  try {
    return jwt.sign({ _id, name, email, u_type }, SECRET_KEY, {});
  } catch (error) {
    throw new Error('Error creating JWT token');
  }
};


// Register a new client
userRouter.post('/client/register', async (req, res) => {
  try {
    const { name, email, password, u_type } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user for clients
    const newUser = new User({ name, email, password: hashedPassword, u_type });
    await newUser.save();

    const userData = {
      _id: User._id,
      name: User.name,
      email: User.email,
      u_type: User.u_type,
    };
    
    const token = createToken(userData);
    
    // Respond with a success message 
    res.status(201).json({ message: "Client registered successfully!", token});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//register admin
userRouter.post('/admin/register', async (req, res) => {
  try {
    const { name, email, password, u_type } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user for clients
    const newUser = new User({ name, email, password: hashedPassword, u_type });
    await newUser.save();

    const userData = {
      _id: User._id,
      name: User.name,
      email: User.email,
      u_type: User.u_type,
    };
    
    const token = createToken(userData);
    
    // Respond with a success message 
    res.status(201).json({ message: "Admin registered successfully!", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register a new broker
userRouter.post('/broker/register', async (req, res) => {
  try {
    const { name, email, password, u_type, contact } = req.body;

    console.log(req.body);

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const hashedPassword = await hashPassword(password);

    // Create a new user for brokers
    const newUser = new User({ name, email, password:hashedPassword, u_type, contact });
    await newUser.save();

    const userData = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      u_type: newUser.u_type,
    };
    
    const token = createToken(userData);
    
    // Respond with a success message or the created user object
    res.status(201).json({ message: "Broker registered successfully!", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user by ID
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific broker by ID and return specific fields
userRouter.get('/owner/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name email contact.authorization contact.phone contact.company');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
    console.log(user);
  } catch (error) {
    console.log("ERROR CANT SEND DATA");
    res.status(500).json({ error: error.message });
  }
});



// Update a user by ID
userRouter.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
userRouter.delete('/delete/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Login a user
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    const match = await comparePassword(password, user.password);

    if (match) {

      const userData = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        u_type: user.u_type
      };

      console.log('UserData from route',userData);
      
      const token = createToken(userData);

      res.status(200).json({message: 'Login successful',token,userData});
      console.log("UserData: ",userData);
      console.log('token from route',token);

    } else {
      res.json({ message: 'Wrong Password' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
