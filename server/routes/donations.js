import express from 'express';

import { getDonations, getDonation, createDonation, updateDonation, likeDonation, deleteDonation } from '../controllers/donations.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDonations);
router.post('/', auth, createDonation);
//router.get('/:id', getDonation);
router.patch('/:id', auth,  updateDonation);
router.delete('/:id', auth, deleteDonation);
router.patch('/:id/likeDonation', auth, likeDonation);

export default router;