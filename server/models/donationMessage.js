import mongoose from 'mongoose';

const donationSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    //tags: [Strings],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var DonationMessage = mongoose.model('DonationMessage', donationSchema);

export default DonationMessage;