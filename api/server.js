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
//             res.status(500).json({
//                 message: `no users with id of ${id}`,
//                 error: err.message,
//             })
//         })
// })
server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user){
            res.status(404).json({
                message: `user with id ${id} does not exist`
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


//UPDATE USER


//DELETE USER














module.exports = server;
