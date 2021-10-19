import express from 'express';
import RestaurantsCtrl from './restaurants.controller.js';
import ReviewsCtrl from './reviews.controller.js';

const router = express.Router();

// apparently in here you ave to use router.route...... which is retarded.
// router.route('/').get((req, res)=>{
// 	res.send('hello world!');
// });

// using the controller.
router.route('/').get(RestaurantsCtrl.apiGetRestaurants);

router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantByID);
router.route('/cuisines').get(RestaurantsCtrl.apiGetRestaurantCuisines);

// i hate that i have to do router.route(); when you could do router(/);
// i think its because of the import? tho im not sure.
router.route('/review')
	// new review
	.post(ReviewsCtrl.apiPostReview)
	// update a review
	.put(ReviewsCtrl.apiUpdateReview)
	// delete a review
	.delete(ReviewsCtrl.apiDeleteReview);

export default router;