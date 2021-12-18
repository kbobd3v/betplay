const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic, balance } = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400)
        throw new Error("Ya existe este usuario");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
        balance,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            balance: user.balance,
        });
    } else {
        res.status(400);
    throw new Error('Error');
    }

});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
        });
    } else {
        res.status(400);
    throw new Error('Email o contraseña invalida!');
    }


});

module.exports={ registerUser, authUser };