const { response } = require("express");
const mongoose= require("mongoose")
const noteModel= require("../models/notes");

const createNote = async (req, res)=>{
    console.log("Incoming request body:", req.body);
    const {title, description}=req.body;

    const newNote= new noteModel({
        title:title,
        description:description,
        userId:req.userId

    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }

}

const deleteNote=async (req, res)=>{
    const id=req.params.id;
    if (id.startsWith(':')) {
        id = id.substring(1);
    }
    try {

        const curr_note = await noteModel.findById(id);

        if (!curr_note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // if (curr_note.userId.toString() !== req.userId) {
        //     return res.status(403).json({ message: "Unauthorized: You can only delete your own notes" });
        // }



        await noteModel.findByIdAndRemove(id);
        res.status(202).json({
            message: "Note deleted successfully",
            deletedNote: curr_note // Sending back the deleted note details
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

const updateNote=async (req, res)=>{
    let id= req.params.id;

    if (id.startsWith(':')) {
        id = id.substring(1);
    }
    //console.log(id)
    const {title, description}=req.body;
    const newNote={
        title:title,
        description:description,
        userId: req.userId
    }

    try {
        const updatedNote = await noteModel.findByIdAndUpdate(id,newNote,{new:true});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong " +error});
    }

    
}

const getNote=async (req, res)=>{

    try {
        const notes= await noteModel.find({userId:req.userId});
        res.status(200).json(notes);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong", error: error.message});
    }


}

module.exports={
    createNote,
    updateNote,
    deleteNote,
    getNote
}