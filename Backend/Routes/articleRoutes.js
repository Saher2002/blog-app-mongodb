const express = require("express");
const router = express.Router();
const Article = require("../Models/Articles");
const mongoose = require("mongoose");

// create
router.post("/", async (req ,res) => {
    try{
        const { title, body } = req.body;
        const newArticle = new Article({ title, body });
        const saved = await newArticle.save();
        res.json(saved);
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
});

// read all
router.get("/",async (req,res) =>{
    const articles = await Article.find().sort({ date : -1});
    res.json(articles);
});

// update
router.put("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid article ID format" });
      }
     try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        console.log("Incoming ID:", req.params.id);
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(updated);
    } catch (err) {
      console.error("PUT error:", err.message);
      res.status(500).json({ error: "Failed to update article" });
    }
  });
  
// delete
router.delete("/:id",async (req,res) => {
    try{
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted"});

    }
    catch(err){
        console.error("DELETE error:", err.message);
        res.status(500).json({ error: "Failed to delete article" });
    }
});

module.exports = router;