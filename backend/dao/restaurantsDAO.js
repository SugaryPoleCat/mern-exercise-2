// DAO = data acceess object;
'use strict';

// define restaurants for later use
let restaurants;
// odrazu module.exports czemu kurwa nie
export default class RestaurantsDAO {
	// get yourseful into the DB.
	// this is our own cuystome method that injects to the db.
	static async injectDB(conn) {
		// IF we already have a connection, return;
		if (restaurants) {
			return;
		}
		// if we dont, inject a new connection.
		try {
			restaurants = await conn.db(process.env.ATLAS_DB).collection('restaurants');
			console.log('Connection accepted! DB injected');
		} catch (err) {
			console.error('Unable to establish a collection handle in restaurantsDAO: ', err);
			return;
		}
	}

	// method that will return us with the restaurants.
	static async getRestaurants({
		// options. these are defaults;
		// these arethings we made up as options for this method
		filters = null,
		page = 1,
		restaurantsPerPage = parseInt(process.env.RESTAURANTS_PP),
	} = {}) {
		console.log('we are tring to get the restaurants');
		let query;
		// if the filters are empty, just go by defualt.
		// otherwise, heres the filter.
		if (filters) {
			if ('name' in filters) {
				// these seem to be mongoDB things.
				// these $search things have to be set up in the mongodb databse
				query = { $text: { $search: filters['name'] } };
			} else if ('cuisine' in filters) {
				// $eq is equals.
				query = { 'cuisine': { $eq: filters['cuisine'] } };
			} else if ('zipcode' in filters) {
				query = { 'address.zipcode': { $eq: filters['zipcode'] } };
			}
		}

		let cursor;
		try {
			// this will execute the query
			cursor = await restaurants.find(query);
			console.log('we got the cursor!');
		} catch (err) {
			console.error('Unable to issue find command: ', err);
			return { restaurantsList: [], totalNumrestaurants: 0 };
		}

		// limit the results shown 
		// skip shows the actual page number
		const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);
		console.log('display cursor: ', displayCursor);

		try {
			// give the result to an array.
			const restaurantList = await displayCursor.toArray();
			console.log('display cursos to array: ', await displayCursor.toArray());
			// count the documents in the query.
			// documetns is the way in MongoDB of saying "items"... mongodb trying to be fancy and shit.
			const totalNumberRestaurants = await restaurants.countDocuments(query);

			console.log('we got the list and the number of restaurants!');
			console.log('LIST: ', restaurantList);
			return { restaurantList, totalNumberRestaurants };
		} catch (err) {
			console.error('Unable to convert cursor to array or problem counting documents: ', err);
			return { restaurantList: [], totalNumberRestaurants: 0 };
		}
	}
}