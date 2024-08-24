const express = require("express");
const router = express.Router();
const YouTubeChannelVideo = require("../models/youtube");

// List all videos
router.get("/", async (req, res) => {
  try {
    const videos = await YouTubeChannelVideo.find();
    res.render("youtube/index", { videos });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Display form to create a new video
router.get("/new", (req, res) => {
  res.render("youtube/new");
});
router.post("/new", async (req, res) => {
  try {
    const { title, videoUrl, description, imageUrl, views, likes, dislikes } =
      req.body;
    const newVideo = new YouTubeChannelVideo({
      title,
      videoUrl,
      description,
      imageUrl,
      views,
      likes,
      dislikes,
    });

    await newVideo.save();
    res.redirect("/youtube");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving video");
  }
});

// Show video details
router.get("/:id", async (req, res) => {
  try {
    const video = await YouTubeChannelVideo.findById(req.params.id);
    if (!video) {
      return res.status(404).send("Video not found");
    }
    res.render("youtube", { video });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Display form to edit a video
router.get("/edit/:id", async (req, res) => {
  try {
    const video = await YouTubeChannelVideo.findById(req.params.id);
    if (!video) {
      return res.status(404).send("Video not found");
    }
    res.render("youtube/edit", { video });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Update video
router.post("/update/:id", async (req, res) => {
  try {
    const { title, videoUrl, description, imageUrl, views, likes, dislikes } =
      req.body;
    await YouTubeChannelVideo.findByIdAndUpdate(req.params.id, {
      title,
      videoUrl,
      description,
      imageUrl,
      views,
      likes,
      dislikes,
    });

    res.redirect(`/youtube`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating video");
  }
});

// Delete a video
router.delete("/:id", async (req, res) => {
  try {
    const deletedVideo = await YouTubeChannelVideo.findByIdAndDelete(
      req.params.id
    );
    if (!deletedVideo) {
      return res.status(404).send("Video not found");
    }
    res.redirect("/youtube");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
