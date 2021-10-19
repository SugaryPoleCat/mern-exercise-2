// call the Database access object thing
import RestaurantsDAO from '../dao/restaurantsDAO.js';

// export the whole thing, as, this is going to be database access.
// We will be making query calls most of the time with the api code we did in RestaurantsDAO.
export default class RestaurantsController {
	static async apiGetRestaurants(req, res) {
		// set restaurants per page based on query parsed in the URL.
		// The thing before the ? checks if it Exists or is true, then we do the thing. : means that if it does NOT, ten do this. 
		const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : parseInt(process.env.RESTAURANTS_PP);
		const page = req.query.page ? parseInt(req.query.page, 10) : 0;

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
			const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({ filters, page, restaurantsPerPage });

			// he put in let in his tutorial, but im gonna go with const, because we dont change this.
			const response = {
				restaurants: restaurantsList,
				page: page,
				filters: filters,
				entries_per_page: restaurantsPerPage,
				total_results: totalNumRestaurants,
			};
			console.log('response: ', response);
			// and then RESPOND with a JOSN call.
			res.json(response);
		}
		catch (err) {
			console.error('Unable to convert cursor to array or problem counting documents: ', err);
		}
	}
}