import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    fileUrl:{
        type:String,
        required:"File URL is required."
    },
    title:{
        type:String,
        required:"Title is required."
    },
    description:String,
    views:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
    
});

//스키마 정의

const model = mongoose.model("Video",VideoSchema); //생성

export default model;
