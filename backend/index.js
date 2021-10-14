import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const MongoClient = mongodb.MongoClient;

const PORT = process.env.PORT || 5000;

try {
	// before we had to use Mongoose, now we use mongodb clinet.
	MongoClient.connect(
		`mongodb+srv://${process.env.ATLAS_LOGIN}:${process.env.ATLAS_PASS}@cluster0.cmueh.mongodb.net/${process.env.ATLAS_DB}?retryWrites=true&w=majority`,
		{
			// poolSize: 50,
			wtimeout: 2500,
			useNewUrlParser: true
		},
	).then(async client => {
		app.listen(PORT, ()=>{
			console.log(`server started on: ${PORT}`);
		})
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