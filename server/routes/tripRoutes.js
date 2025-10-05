// server/routes/tripRoutes.js
import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createTripRequest, getUserTrips, saveItinerary, getUserItineraries } from '../controllers/tripController.js';

const router = Router();

// Trip requests
router.post('/trips', protect, createTripRequest);
router.get('/trips', protect, getUserTrips);

// Itineraries
router.post('/itineraries', protect, (req, res, next) => { console.log('POST /api/itineraries hit'); next(); }, saveItinerary);
router.get('/itineraries', protect, getUserItineraries);

export default router;
