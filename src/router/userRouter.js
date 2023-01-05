const express = require('express')
const User = require('../models/Users')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const multer = require('multer')
const router = new express.Router()

router.post('/users',async (req,res)=>{
    const user = new User(req.body)  
    try{
        await user.save()
        const token = await user.createAuthToken()
        res.status(201).send({user,token})
    }
    catch (e){
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.createAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user)
}) 

router.post('/user/logout', auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        console.log(req.token)
        console.log(req.user)
        res.send()
    }catch(e){
        res.status(500).send()

    }
})

router.post('/user/logoutAll', auth, async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        console.log(req.token)
        console.log(req.user)
        res.send()
    }catch(e){
        res.status(500).send()

    }
})

router.patch('/users/update',  auth, async (req,res)=>{
    const updateKeys = Object.keys(req.body)
    const allowedKeys = ['name','email','password']
    const isValidKeys = updateKeys.every((key)=>allowedKeys.includes(key))
    if (!isValidKeys)
        return res.status(400).send({'Error':'Invalid Keys Entered'})
    try{
        updateKeys.forEach((key)=>  req.user[key] = req.body[key] )
        await req.user.save()
        res.send(req.user)
    }   
    catch(err){
        return res.status(400).send(err)
    }
})

router.delete('/users/me', auth, async (req,res)=>{
    try{
        await req.user.remove()
        return res.send(req.user)
    }
    catch (err){
        res.status().send(err)
    }
})

const upload = multer({
    limits:{
        fileSize: 1000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg)$/)){
            cb(new Error('Please upload a JPG or JPEG'))
        }
        cb(undefined,true)
    }
})

router.post('/user/me/avatar/', auth, upload.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({message:'File uploaded Successfully'})
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/user/me/avatar/', auth, async (req,res)=>{
    try{
        req.user.avatar = undefined
        await req.user.save()
        res.send({message:'File deleted Successfully'})
    }catch(e){
        res.status(500).send({error:'Error while Deleting user Profile image'})
    }
})
router.get('/user/:id/avatar/', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar)
            throw new Error()
        res.set('Content-Type','image/png')
        res.send(user.avatar)            
    }catch(e){
        res.status(400).send()
    }    
    // try{
    //     if(!req.user.avatar)
    //         throw new Error()
    // res.set('Content-Type','image/jpg')
    // res.send(req.user.avatar)

    // }catch(e){
    //     res.status(400).send({error:'No image available for User'})
    // }
})
module.exports = router