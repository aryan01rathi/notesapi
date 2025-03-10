const express= require("express");
const auth=require("../middleware/auth")
const { getNote, createNote, deleteNote, updateNote } = require("../controlller/noteController");
const noteRouter= express.Router();

// getnotes or creatnotes all these are next function in auth middleware
noteRouter.get('/',auth, getNote);

noteRouter.post('/', auth, createNote);
 
noteRouter.delete("/:id",auth, deleteNote);

noteRouter.put("/:id",auth, updateNote);

module.exports=noteRouter;
