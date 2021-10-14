import express from 'express';
import RestaurantsCtrl from './restaurants.controller.js';

const router = express.Router();

// apparently in here you ave to use router.route...... which is retarded.
// router.route('/').get((req, res)=>{
// 	res.send('hello world!');
// });

// using the controller.
router.route('/').get(RestaurantsCtrl.apiGetRestaurants);

export default router;