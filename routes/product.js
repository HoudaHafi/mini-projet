const express = require('express');

const router = express.Router();
const Product = require('../models/product');

const multer = require('multer');

filename = '';

const mystoarge = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect)=>{
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        redirect(null , fl);
        filename = fl;
    }
})

const upload = multer({storage: mystoarge});


router.post('/createproduct', upload.any('image') , async (req, res)=>{
    try {
        data = req.body;
        prod = new Product(data); 
        prod.image = filename;
        savedProd = await prod.save();
        filename = '';
        res.status(200).send(savedProd)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/allproduct', async (req, res)=>{
    try {
        products = await Product.find( );
        res.status(200).send(products);
        
    } catch (error) {
        res.status(400).send(error)
        
    }
})

router.put('/updateprod/:id', async (req,res)=>{
    try {
        myid = req.params.id;
        newData = req.body;
        updatedProd = await Product.findByIdAndUpdate({_id: myid}, newData , { new: true });
        res.status(200).send(updatedProd);
        
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router;