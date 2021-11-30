// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model')

const server = express();

server.use(express.json()); //middleware to support JSON

//ENDPOINTS

//GET ALL
server.get('/api/users', (req,res)=>{
    User.find()
        .then(users=>{
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'thurr aint no users thurr',
                error: err.message,
            })
        })

})


//GET BY ID
// server.get('/api/users/:id', (req, res) => {
//     const { id } = req.params
//     console.log(id)
//     User.findById(id)
//         .then(user=>{
//             console.log(user)
//             res.json(user)
//         })
//         .catch(err => {
//             res.status(404).json({
//                 message: "The user with the specified ID does not exist",
//                 error: err.message,
//             })
//         })
// })
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else{
            res.json(user);
        }
    } catch (err) {
        res.status(500).json({
            message: 'no user found',
            error: err.message,
        })
    }
})



//POST NEW USER
server.post('/api/users', async (req, res)=>{
    try {
        if (!req.body.name || !req.body.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else{
            const newUser = await User.insert(req.body)
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({
            message: "There was an error while saving the user to the database",
            error: error.message,
        })
    }
})


//UPDATE USER
server.put('/api/users/:id', async (req, res)=>{
    try {
        if (!req.body.name || !req.body.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else{
            const updatedUser = await User.update(req.params.id, req.body)
            if (!updatedUser){
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
            else {
                res.status(201).json(updatedUser)
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'error updating new user',
            error: error.message,
        })
    }
})


//DELETE USER

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    User.remove(id)
        .then(deletedUser => {
            if(!deletedUser){
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else {
                res.json(deletedUser)
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: "error deleting a user",
                error: err.message,
            })
        })
})


module.exports = server;
