const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

exports.login = async(req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({error: true, message: "Username and Password are required" })
    }
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ 
            error: true, 
            message: "Invalid credentials" 
        });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
   if (!isMatch) {
        return res.status(401).json({ 
            error: true, 
            message: "Invalid credentials" 
        });
    } 
    const payload = {
        id: user._id,
        username: user.username
    };

    // Generate token
    const accessToken = jwt.sign(
        payload, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '1h' }
    );
    // Send response
    return res.json({ 
        error: false, 
        message: "Login successful", 
        user: {
            id: user._id,
            username: user.username
        }, 
        accessToken
    });
   
}
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ username });

    if (isUser) {
        return res.json({ error: true, message: "User already exists" });
    }

    const user = new User({ username, password });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });


    return res.json({ error: false, user, accessToken, message: "Registration successful", name: user.username });
};