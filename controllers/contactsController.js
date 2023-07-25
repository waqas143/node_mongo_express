const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");

const getContacts = asyncHandler(async (req,res) => {
    const contacts = await contactModel.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req,res) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const createContact = asyncHandler(async (req,res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required ");
    }
    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req,res) => {
    const contact = await contactModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(contact);
});

const deleteContact = asyncHandler(async (req,res) => {
    const contact = await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports = {getContacts,getContact,createContact,updateContact,deleteContact};