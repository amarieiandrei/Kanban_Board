const express = require('express')
const router = express.Router()
const Board = require("../models/Board")

// Get request method (read)
router.get("/", async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get request method by id (read by id)
router.get("/:boardId", async (req, res) => {
    try {
        const board = await Board.findById(req.params.boardId);
        res.json(board);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post request method (create)
router.post("/", async (req, res) => {
    const board = new Board({
        title: req.body.title,
    });

    try {
        const savedBoard = await board.save();
        res.json(savedBoard);
    } catch (err) {
        res.json({ message: err });
    }
});

// Put request method (update)
router.put("/:boardId", async (req, res) => {
    try {
        const updatedBoard = await Board.updateOne(
            { _id: req.params.boardId },
            { $set: { title: req.body.title } }
        );
        res.json(updatedBoard);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete request method (delete)
router.delete("/:boardId", async (req, res) => {
    try {
        const removedBoard = await Board.deleteOne({ _id: req.params.boardId });
        res.json(removedBoard);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete request method (delete all)
router.delete("/", async (req, res) => {
    try {
        const removedAllBoard = await Board.deleteMany();
        res.json(removedAllBoard);
    } catch (err) {
        res.json({ message: err });
    }
});

// Validation

module.exports = router;