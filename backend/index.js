import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import RestaurantsDAO from './dao/restaurantsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
dotenv.config();

const MongoClient = mongodb.MongoClient;

const PORT = process.env.PORT || 5000;

try {
	// before we had to use Mongoose, now we use mongodb clinet.
	MongoClient.connect(
		// i assumed he created a sample_restuarants database, but it was actuall mongodb sample.
		// shows you to not skip anything
		`mongodb+srv://${process.env.ATLAS_LOGIN}:${process.env.ATLAS_PASS}@cluster0.cmueh.mongodb.net/${process.env.ATLAS_DB}?retryWrites=true&w=majority`,
		{
			// pooolsize is how many users can conect at once
			// poolSize: 50,
			// apparenrtly in my mongoclient they have no ppoolsize option
			wtimeoutMS: 2500,
			useNewUrlParser: true
		},
	).then(async client => {
		// get inital reference to restaurants collection in database. AKA THE RESTAURATS TABLE.
		await RestaurantsDAO.injectDB(client);
		await ReviewsDAO.injectDB(client);
		app.listen(PORT, () => {
			console.log(`server started on: ${PORT}`);
		})
		// apparentyl have to use .catch in this method...
	}).catch((err) => {
		console.error(err.stack);
		process.exit(1);
	});
}
catch (err) {
	console.error(err.stack);
	process.exit(1);
	// or: 
	// throw new Error(err);
}
// async function client(){
// 	app.listen(PORT, () => {
// 		console.log(`listening on port ${PORT}`);
// 	})
// }
// client();