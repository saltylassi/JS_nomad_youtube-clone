import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number,
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
        },
    ],
});

UserSchema.plugin(passport, {
    usernameField: "email",
});

const model = mongoose.model("User", UserSchema);

export default model;
