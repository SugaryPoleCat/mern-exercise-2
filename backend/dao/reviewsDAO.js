import mongodb from 'mongodb';
const ObjectID = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
	static async injectDB(conn) {
		if (reviews) {
			console.log('reivews already exists')
			return;
		}
		try {
			reviews = await conn.db(process.env.ATLAS_DB).collection('reviews');
			console.log('Reviews table got!');
		} catch (err) {
			console.error('Unable to establish collection handles in reviewsDAO: ', err);
		}
	};

	static async addReview(restaurantID, user, review, date) {
		try {
			// reviw doc stands for review document. connected to the frontend.
			const reviewDoc = {
				name: user.name,
				user_id: user._id,
				date: date,
				text: review,
				restaurant_id: ObjectID(restaurantID),
			};
			return await reviews.insertOne(reviewDoc);
		} catch (err) {
			console.error('Unable to post review: ', err);
			// wonder why hes doing this? He dont explain nothing!
			return { error: err };
		}
	};

	static async updateReview(reviewID, userID, text, date) {
		try {
			const updateResponse = await reviews.updateOne(
				{ user_id: userID, _id: ObjectID(reviewID) },
				// this $set is a mongodb custom thingy.
				{ $set: { text: text, date: date } },
			);
			return updateResponse;
		} catch (err) {
			console.error('Unable to update review: ', err);
			return { error: err };
		}
	};

	static async deleteReview(reviewID, userID) {
		try {
			const deleteResponse = await reviews.deleteOne({
				_id: ObjectID(reviewID),
				user_id: userID,
			});
			return deleteResponse;
		} catch (err) {
			console.error('Unable to delete review: ', err);
			return { error: err };
		}
	};
};

// so all the user_id, _id, review_id, those are all the mongoDB standard table stuff. All the other shit like 
// userID, reviewID, date, the things that get parsed into user_id, _id etc, those are my own things.