import express from 'express';
import mongoose from 'mongoose';

import DonationMessage from '../models/donationMessage.js';

const router = express.Router();

export const getDonations = async (req, res) => {
    try {
        const donationMessages = await DonationMessage.find();
        res.status(200).json(donationMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDonation = async (req, res) => { 
    const { id } = req.params;

    try {
        const donation = await DonationMessage.findById(id);
        
        res.status(200).json(donation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createDonation = async (req, res) => {
    const donation = req.body;

    const newDonationMessage = new DonationMessage({ ...donation, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newDonationMessage.save();

        res.status(201).json(newDonationMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateDonation = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No donation with id: ${id}`);

    const updatedDonation = { creator, title, message, selectedFile, _id: id };

    await DonationMessage.findByIdAndUpdate(id, updatedDonation, { new: true });

    res.json(updatedDonation);
}

export const deleteDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No donation with id: ${id}`);

    await DonationMessage.findByIdAndRemove(id);

    res.json({ message: "Donation deleted successfully." });
}

export const likeDonation = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' } );

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No donation with id: ${id}`);
    
    const donation = await DonationMessage.findById(id);

    const index = donation.likes.findIndex((id) => id === String(req.userId ) );

    if(index === -1) {
        // for liking the donation 
        donation.likes.push(req.userId); 
    } else {
        // dislike the donation 
        donation.likes = donation.likes.filter((id) => id !== String(req.userId));

    }

    const updatedDonation = await DonationMessage.findByIdAndUpdate(id, donation, { new: true });
    
    res.json(updatedDonation);
}

export default router;