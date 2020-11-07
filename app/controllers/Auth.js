const { users } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    JWT_PRIVATE_KEY
} = process.env;

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const checkUser = await users.findOne({where: {email}});
    if(checkUser !== null) {
        res.status(400).json({
            status: false,
            message: 'Email is already exist.',
        });
    }else{
        const createUser = await users.create({
            name, 
            email, 
            password: bcrypt.hashSync(password, 15)
        });
        res.status(200).json({
            status: true,
            message: 'Registration is successful',
            data: createUser
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const checkUser = await users.findOne({where: {email}});
    if(checkUser === null) {
        res.status(400).json({
            status: false,
            message: 'Email is not registered.'
        })
    }else{
        if(!bcrypt.compareSync(password, checkUser.password)) {
            res.status(400).json({
                status: false,
                message: 'Password mismatch.'
            })
        }else{
            const token = jwt.sign(
                JSON.stringify(checkUser), 
                JWT_PRIVATE_KEY
            );
            res.status(200).json({
                status: true,
                message: 'Login successful',
                data: {
                    token
                }
            })
        }
    }
}