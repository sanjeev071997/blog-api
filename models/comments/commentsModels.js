import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    postId: {
        type: String,
        required: true,
    },

    comments: {
        type: String,
        trim: true,
        required: [true, "Please Write Your Comment"],
    },

    senderProfile: {
        type:String,
        required: true,
    }

},
    { timestamps: true }
);


const comment = mongoose.model("Comment", commentSchema);
export default comment;