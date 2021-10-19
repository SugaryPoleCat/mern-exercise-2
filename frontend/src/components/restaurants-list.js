import React, { useState, useEffect } from 'react';
import RestaurantDataService from '../services/restaurant';
import { Link } from 'react-router-dom';

const RestaurantsList = props => {
	const [restaurants, setRestaurants] = useState([]);
	const [searchName, setSearchName] = useState('');
	const [searchZip, setSearchZip] = useState('');
	const [searchCuisine, setSearchCuisine] = useState('');
	const [cuisines, setCuisines] = useState(['All Cuisines']);

	// react hooks
	// tells react taht components neeeds to do someting after hookup.
	useEffect(() => {
		retrieveRestaurants();
		retrieveCuisines();
	}, []);

	const onChangeSearchName = e => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};
	const onChangeSearchZip = e => {
		const searchZip = e.target.value;
		setSearchZip(searchZip);
	};
	const onChangeSearchCuisine = e => {
		const searchCuisine = e.target.value;
		setSearchCuisine(searchCuisine);
	};
	const retrieveRestaurants = () => {
		RestaurantDataService.getAll()
			.then(response => {
				console.log(response.data);
				setRestaurants(response.data.restaurants);
			})
			.catch(err => {
				console.log(err);
			});
	};
	const retrieveCuisines = () => {
		RestaurantDataService.getCuisines()
			.then(response => {
				console.log(response.data);
				setRestaurants(['All Cuisines'].concat(response.data));
			})
			.catch(err => {
				console.log(err);
			});
	};
	const refreshList = () => {
		retrieveRestaurants();
	};
	const find = (query, by) => {
		RestaurantDataService.find(query, by)
			.then(response => {
				console.log(response.data);
				setRestaurants(response.data.restaurants);
			})
			.catch(err => {
				console.log(err);
			});
	};
	const findByName = () => {
		find(searchName, 'name');
	};
	const findByZip = () => {
		find(searchZip, 'zipcode');
	};
	const findByCuisine = () => {
		if (searchCuisine == 'All Cuisine') {
			refreshList();
		} else {
			find(searchCuisine, 'cuisine');
		}
	};

	return (
		<div className="App">
			Hello world;
		</div>
	);
};

export default RestaurantsList;