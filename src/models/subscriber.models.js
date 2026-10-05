import mongoose, {Schema} from 'mongoose'; 


const subscriberSchema = new Schema({
    subscriber : {
        type : Schema.Types.ObjectId, 
        ref :"User"
    },
    channel : {
        typr : Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true});

export default mongoose.model("Subscriber", subscriberSchema)