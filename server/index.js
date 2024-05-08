var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var connection = require('./connection')
var mongo = require('mongodb')
var fileupload=require('express-fileupload')
var path = require('path');



var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(fileupload())
app.use(express.static(path.join(__dirname, 'public')));

app.post('/register', async (req, res) => {
	let info = {
	  name: req.body.name,
	  email: req.body.email,
	  password: req.body.password,
	  status:1
	};

	const db = await connection;
	await db.collection('Register').insertOne(info);
	res.json({ success: true, message: 'Registration successful' });
});


app.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const db = await connection;
	const user = await db.collection('Register').findOne({ email });
	if (user) {
		if (password === user.password) {
			const userDetails = {
				_id: user._id,
				name: user.name,
				email: user.email,
				status: user.status,
			};
			res.json({
				success: true,
				message: 'Login successful',
				userDetails,
			});
		} else {
			res.status(401).json({ success: false, message: 'Invalid credentials' });
		}
	} else {
		res.status(404).json({ success: false, message: 'Not a registered user' });
	}   
});

app.post('/add-product', (req, res) => {
	let details = {
		productName: req.body.productName,
		description: req.body.description,
		price: req.body.price,
		Image:req.files.image.name,
	}
	connection.then((db) => {
		db.collection('Info').insertOne(details).then((result) => {
			const fileupload=req.files.image
            fileupload.mv("./public/" + details.Image).then((data)=>{
				res.json({ success: true });
            })
		})
	})
})


app.get('/view', (req, res) => {
	connection.then((db) => {
		db.collection("Info").find({}).toArray().then((result) => {
			res.json(result)
		})
	})
})

app.listen(4000)