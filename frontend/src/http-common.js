import axios from 'axios';

export default axios.create({
	// he url of our backend
	baseURL: 'http://localhost:5000/api/v1/restaurants',
	headers: {
		'Content-type': 'application/json',
	},
});