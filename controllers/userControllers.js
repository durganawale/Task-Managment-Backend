
const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const register = async(req, res) => {
    try {
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            return res.status(400).send({
                msg: "please Provide name,email and password",
                success: false
            })
        }

        const existingUser = await User.findOne({
            where: {email}
        })

        if (existingUser) {
            return res.status(400).send({
                msg: "Email already registered",
                success: false
            })
        }

        const salt = bcryptjs.genSaltSync(8)
        const bcryptPassword = bcryptjs.hashSync(password, salt)

        const newuser = await User.create({
            name: name,
            email: email,
            password: bcryptPassword
        })

        res.status(201).send({
            msg: "User registered successfully",
            user: {
                id: newuser.id,
                name: newuser.name,
                email: newuser.email
            },
            success: true
        })
        if(newuser){
                    res.status(200).send({
            msg: "Register Successfully",
            success: true
                    })
        }
else{
    res.status(400).send({msg:"Not Register Contact Admin"})
}
    } catch (error) {
        res.status(500).send({
            msg: "server error",
            success: false
        })
    }
}

const login =async (req,res) => {
    try {
        const {email,password}=req.body
                if ( !email || !password) {
            return res.status(400).send({
                msg: "please Provide email and password",
                success: false })
        }
                const existingUser = await User.findOne({
            where: {email}
        })

                if (!existingUser) {
            return res.status(400).send({
                msg: "please provide correct email",
                success: false
            })
        }

        const checkpassword=bcryptjs.compareSync(password,existingUser.password)
        console.log(checkpassword,"check Password")
        if(!checkpassword){
            return res.status(400).send({msg:"please Provide Correct passworld",success:false})
        }
const paylod = {
    ID: existingUser.id,
    role: existingUser.role
}

const token = jwt.sign(
    paylod,
    process.env.SCRITE_KEY,
    { expiresIn: '7d' }) 
        console.log(token,"TOKEN")
        res.status(200).send({msg:"login successfully",token:token ,success:true})
    } 

    catch (error) {
    console.log("Login Error:", error);

    res.status(500).send({
        msg: "server error",
        error: error.message,
        success: false
    })
}
    }


const getUserInfo = async (req, res) => {
    try {
        console.log("Logged User:", req.user);

        const ID = req.user.ID;

        console.log("User ID:", ID);

        const user = await User.findByPk(ID);

        if (!user) {
            return res.status(404).send({
                msg: "User not found",
                success: false
            });
        }

        const updatedUser = {
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(200).send({
            msg: "User information fetched successfully",
            user: updatedUser,
            success: true
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            msg: "Server error",
            success: false
        });
    }

}

const getAllUsers=async(req,res)=>{
     try{
const users= await User.findAll()
res.status(200).send({users:users})
        } catch (error) {
        console.log(error);

        res.status(500).send({
            msg: "Server error",
            success: false
        });
    }
}

const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.user.ID;

        if (!req.file) {
            return res.status(400).send({
                msg: "Please upload a profile image"
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send({
                msg: "User not found"
            });
        }

        user.profileImage = req.file.path;

        await user.save();

        res.status(200).send({
            msg: "Profile image uploaded successfully",
            profileImage: user.profileImage
        });

    } catch (error) {
        res.status(500).send({
            msg: error.message
        });
    }
};




module.exports = {
    register,
    login,
    getUserInfo,
    getAllUsers,
    uploadProfileImage

    
}
