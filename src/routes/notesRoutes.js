const express= require("express");
const auth=require("../middleware/auth")
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");
const { getNote, createNote, deleteNote, updateNote } = require("../controlller/noteController");
const noteRouter= express.Router();

// getnotes or creatnotes all these are next function in auth middleware

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


const sanitizeInput = (req, res, next) => {
    req.body.title = sanitizeHtml(req.body.title).trim();
    req.body.description = sanitizeHtml(req.body.description).trim();

    if (!req.body.title) {
        return res.status(400).json({ message: "Title is required and cannot be empty or invalid." });
    }
    if (!req.body.description) {
        return res.status(400).json({ message: "Description is required and cannot be empty." });
    }

    next();
};

//create note

noteRouter.post(
    "/",
    auth,
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ],
    validateRequest,
    sanitizeInput,
    createNote
);

//get note
noteRouter.get('/',auth, getNote);

// delete note
 
noteRouter.delete("/:id",auth, deleteNote);
//update note
noteRouter.put(
    "/:id",
    auth,
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ],
    validateRequest,
    sanitizeInput,
    updateNote
);

module.exports=noteRouter;
