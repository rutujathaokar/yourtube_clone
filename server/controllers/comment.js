import comment from "../Modals/comment.js";
import mongoose from "mongoose";
import translate from "translate-google";

export const postcomment = async (req, res) => {
   console.log(req.body);

  const commentdata = req.body;
  const postcomment = new comment(commentdata);
  try {
    await postcomment.save();
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getallcomment = async (req, res) => {
  const { videoid } = req.params;
  try {
    const commentvideo = await comment.find({ videoid: videoid });
    return res.status(200).json(commentvideo);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const deletecomment = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }
  try {
    await comment.findByIdAndDelete(_id);
    return res.status(200).json({ comment: true });
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const editcomment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentbody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("comment unavailable");
  }
  try {
    const updatecomment = await comment.findByIdAndUpdate(_id, {
      $set: { commentbody: commentbody },
    });
    res.status(200).json(updatecomment);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



const commentvideo = await comment
  .find({ videoid: videoid })
  .sort({ createdAt: -1 });


export const likeComment = async (req, res) => {
  try {
    const updated = await comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dislikeComment = async (req, res) => {
  try {
    const updated = await comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    );

    // Auto delete after 2 dislikes
    if (updated.dislikes >= 2) {
      await comment.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        deleted: true,
      });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const translateComment = async (req, res) => {
  try {
    const { text } = req.body;

    const translated = await translate(text, {
      to: "en",
    });

    res.status(200).json({
      translated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Translation failed",
    });
  }
};