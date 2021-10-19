// call the Database access object thing
import RestaurantsDAO from '../dao/restaurantsDAO.js';

// export the whole thing, as, this is going to be database access.
// We will be making query calls most of the time with the api code we did in RestaurantsDAO.
export default class RestaurantsController {
	static async apiGetRestaurants(req, res) {
		// set restaurants per page based on query parsed in the URL.
		// The thing before the ? checks if it Exists or is true, then we do the thing. : means that if it does NOT, ten do this. 
		// i only wonder why he did ,10 i dont get it, he dont explain it
		const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage) : parseInt(process.env.RESTAURANTS_PP);
		const page = req.query.page ? parseInt(req.query.page) : 0;

		// idk why he makes --- kind of 2 same files?
		// RestaurantsDAO and this one have almost the same things.
		// we have iflter there and we have filter here, i dont get it.
		let filters = {};
		// also this can be converted inot a swtich
		if (req.query.cuisine) {
			filters.cuisine = req.query.cuisine;
		} else if (req.query.zipcode) {
			filters.zipcode = req.query.zipcode;
		} else if (req.query.name) {
			filters.name = req.query.name;
		}

		// finally pass it all to the DAO.
		// it all could have been done in 1 file, and idk why he spread it out like that, but i can fix it in later commits.
		try {
			// restaurantList is what its called in RestaruantsDAO.getRestaurants.
			// AND thats what fixes the response too. OMG
			const { restaurantList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({ filters, page, restaurantsPerPage });

			// he put in let in his tutorial, but im gonna go with const, because we dont change this.
			const response = {
				restaurants: restaurantList,
				page: page,
				filters: filters,
				entries_per_page: restaurantsPerPage,
				total_results: totalNumRestaurants,
			};
			// console.log('response: ', response);
			// and then RESPOND with a JOSN call.
			res.json(response);
		}
		catch (err) {
			console.error('Unable to convert cursor to array or problem counting documents: ', err);
		}
	};

	static async apiGetRestaurantByID(req, res) {
		try {
			let id = req.params.id || {};
			let restaurant = await RestaurantsDAO.apiGetRestaurantByID(id);
			if (!restaurant) {
				res.status(404).json({ error: 'Not found' });
				return;
			}
			res.json(restaurant);
		} catch (err) {
			console.log('api: ', err);
			res.status(500).json({ error: err });
		}
	};

	static async apiGetRestaurantCuisines(req, res) {
		try {
			let cuisines = await RestaurantsDAO.getCuisines();
			res.json(cuisines);
		} catch (err) {
			console.log('api: ', err);
			res.status(500).json({ error: err });
		}
	};
};