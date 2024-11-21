const express = require('express');

const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserValidator = require('../validator/regiseterUser')

router.post( '/register', async (req, res)=>{
    const { errors, isValid } = UserValidator(req.body)

    if (!isValid) {
        return res.status(404).json(errors)
    }

    try {
        let data = req.body;
        let usr = new User(data);

        // Générer le sel et hasher le mot de passe
        const salt = bcrypt.genSaltSync(10);
        const cryptedPass = bcrypt.hashSync(data.password, salt);
        usr.password = cryptedPass;

        // Sauvegarder l'utilisateur
        const savedUser = await usr.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }

    /*data = req.body;
    usr = new User(data);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync( data.password, salt); 
    usr.password = cryptedPass;
    usr.save()
        .then(
            (savedUser)=> {
                res.status(200).send(savedUser)
            }
        )
        .catch(
            (err)=> {
                res.status(400).send(err)
            }
        )*/
});

router.post('/login', async (req, res)=>{
    data = req.body;
    user = await User.findOne({ email : data.email})

    if(!user){
        res.status(404).send('email or password invalid !')
    }else{
        validPass = bcrypt.compareSync(data.password, user.password)
        if(!validPass){
            res.status(401).send('email or password invalid !')
        }else{
            payload = {
                _id: user._id,
                email: user.email,
                name: user.name
            }
            token = jwt.sign( payload, '1234567')
            res.status(200).send({ mytoken : token})
        }
    }
    
})

router.post('/create', async (req, res)=>{
    try {
        data = req.body;
        usr = new User(data); 
        savedUser = await usr.save();
        res.send(savedUser)
    } catch (error) {
        res.send(error)
    }
})

router.get( '/getall', (req, res)=>{
    User.find()
    .then(
        (users)=>{
            res.send(users);
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.get('/all', async (req, res)=>{
    try {
        users = await User.find( {name : 'Aya'});
        res.send(users);
        
    } catch (error) {
        res.send(error)
        
    }
})

router.get('/getbyid/:id', (req, res)=>{
    myid = req.params.id;
    User.findOne({_id: myid})
    .then(
        (user)=>{
            res.send(user)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})

router.get('/byid/:id', async (req, res)=>{
    try {
        myid = req.params.id;
        user = await User.findById({_id: myid});
        res.send(user);
        
    } catch (error) {
        res.send(error)
        
    }
})

router.put( '/update/:id', (req,res)=>{
    myid = req.params.id;
    newData = req.body;
    User.findByIdAndUpdate({_id: myid}, newData, { new: true })
    .then(
        (updatedUser)=>{
            res.send(updatedUser)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.put('/modifier/:id', async (req,res)=>{
    try {
        myid = req.params.id;
        newData = req.body;
        updatedUser = await User.findByIdAndUpdate({_id: myid}, newData , { new: true });
        res.send(updatedUser);
        
    } catch (error) {
        res.send(error)
    }
})

router.delete( '/delete/:id', (req, res)=>{
    myid = req.params.id;
    User.findOneAndDelete({_id: myid})
    .then(
        (deletedUser)=>{
            res.send(deletedUser)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.delete('/del/:id', async (req,res)=>{
    try {
        myid = req.params.id;
        deletedUser = await User.findByIdAndDelete({_id: myid})
        res.send(deletedUser)
        
    } catch (error) {
        res.send(error)
    }
})


module.exports = router;