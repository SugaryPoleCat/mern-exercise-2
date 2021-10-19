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
			restaurants = await conn.db(process.env.ATLAS_DB).collection('restuarants');
		} catch (err) {
			console.error('Unable to establish a collection handle in restaurantsDAO: ', e);
			return;
		}
	}

	// method that will return us with the restaurants.
	static async getRestaurants({
		// options. these are defaults;
		filters = null,
		page = 0,
		restaurantsPerPage = parseInt(process.env.RESTAURANTS_PP),
	} = {}) {
		let query;
		// if the filters are empty, just go by defualt.
		// otherwise, heres the filter.
		if (filters) {
			if ('name' in filters) {
				// these seem to be mongoDB things.
				query = { $text: { $search: filters['name'] } };
			} else if ('cuisine' in filters) {
				// $eq is equals.
				query = { 'cuisine': { $eq: filters['cuisine'] } };
			} else if ('zipcode' in filters) {
				query = { 'address.zipcode': { $eq: filters['zipcode'] } };
			}
		}

		let cursor;
		try{
			// this will execute the query
			cursor = await restaurants.find(query);
		} catch(err){
			console.error('Unable to issue find command: ', e);
			return { restaurantsList: [], totalNumrestaurants: 0 };
		}

		// limit the results shown 
		// skip shows the actual page number
		const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);

		try{
			// give the result to an array.
			const restaurantList = await displayCursor.toArray();
			// count the documents in the query.
			// documetns is the way in MongoDB of saying "items"... mongodb trying to be fancy and shit.
			const totalNumberRestaurants = await restaurants.countDocument(query);


			return { restaurantList, totalNumberRestaurants};
		} catch (err){
			console.error('Unable to convert cursor to array or problem counting documents: ', e);
			return { restaurantList: [], totalNumberRestaurants: 0 };
		}
	}
}