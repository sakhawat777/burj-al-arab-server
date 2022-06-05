const express = require('express');

// MiddleWare
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
	'mongodb+srv://burjdb:Biplobbookingsdb1@cluster0.lgf1sij.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
	const bookingsCollection = client.db('burjdb').collection('bookings');
	console.log('DB Connection Success');
	app.post('/addBooking', (req, res) => {
		const newBooking = req.body;
		bookingsCollection.insertOne(newBooking).then((result) => {
			res.send(result.insertedId);
		});
		console.log(newBooking);
	});
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
