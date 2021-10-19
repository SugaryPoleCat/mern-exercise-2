import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
	static async apiPostReview(req, res) {
		try {
			// we are now getting info from the body of hte request, instead of query.
			const restaurantID = req.body.restaurant_id;
			const review = req.body.text;
			const userInfo = {
				name: req.body.name,
				_id: req.body.user_id,
			};
			const date = new Date();

			await ReviewsDAO.addReview(
				restaurantID, userInfo, review, date,
			);
			res.json({ status: 'success' });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	};

	static async apiUpdateReview(req, res) {
		try {
			const reviewID = req.body.review_id;
			const text = req.body.text;
			const date = new Date();
			const reviewResponse = await ReviewsDAO.updateReview(
				reviewID, req.body.user_id, text, date,
			);

			let { error } = reviewResponse;
			if (error) {
				res.status(400).json({ error });
			}

			if (reviewResponse.modifiedCount === 0) {
				throw new Error(
					'Unable to update review - user may not be original poster'
				);
			}

			res.json({ status: 'success' });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	};

	static async apiDeleteReview(req, res) {
		try {
			// we are now getting info from the body of hte request, instead of query.

			// normally you dont have shit like req.body in production.
			// this is just for testing.
			const reviewID = req.query.id;
			const userID = req.body.user_id;
			console.log(reviewID);
			await ReviewsDAO.deleteReview(
				reviewID, userID,
			);
			res.json({ status: 'success' });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	};
}