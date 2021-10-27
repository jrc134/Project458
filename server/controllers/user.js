import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

// json web token saves session for a fixed amount of time. . . 
// bcrypt is used to hash the password . .  
import User from '../models/user.js'; 

export const signin = async (req, res) => {
    const { email, password } = req.body; 

    try{
        const existingUser = await User.findOne({ email }); 

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "invalid credentials " }); 

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h"} );

        res.status(200).json({ result: existingUser, token });

    }catch(error) {
        res.status(500).json({ message: "something went wrong "});
    }
}



export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body; 

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: "user already exists. ."});

        if(password !== confirmPassword) return res.status(400).json({ message: "Password does not match "});

        const hashedPassword = await bcrypt.hash(password, 12); 

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: "1h"} );

        res.status(200).json({ result, token });

    } catch (error) {
        console.log("This is coming from user.js ===");
        res.status(500).json({ message: "something went wrong "}); 
        
    }
}

