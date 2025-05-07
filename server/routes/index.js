import express from 'express';
import adminRoutes from './admin.routes.js';
import matchRequest from './matchRequest.routes.js';
import profileView from './profileView.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

router.use('/match', matchRequest);
router.use('/profile', profileView);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

export default router;