import express = require('express');
import bodyParser = require('body-parser');
import CRUDManager from './CRUDManager';
import multer = require('multer');
import path = require('path');

const port = 8000;
const crudManager = new CRUDManager();

// Create a new express app instance
const app: express.Application = express();
app.use(express.json());
// for parsing application/json
//app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb) {
		cb(null, file.originalname.replace(path.extname(file.originalname), '') + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/savedata', upload.single('file'), function(req: any, res) {
	console.log('Uploade Successful ', req.file, req.body);
	res.send(req.file.filename);
});

// create location
app.post('/api/location', async (req: express.Request, res: express.Response) => {
	console.log(req.body);
	const data = req.body;

	console.log(data);

	const images = data.images || '';
	const tags = data.tags || '';
	if (data.user && data.gps && data.tags && data.title && data.content) {
		const odpoved = await crudManager.create(<string>data.user, <string>data.gps, <string>images, <string>tags, <string>data.title, <string>data.content);
		res.send(odpoved);
		console.log('location create');
	}
	else {
		res.send(false);
		console.log('location create err');
	}
});

// upload image
app.post('/api/upload', async (req: express.Request, res: express.Response) => {
	console.log('upload:', req);
	res.send(true);
});

// update location
app.put('/api/location/:id', async (req: express.Request, res: express.Response) => {
	console.log('put');
	const data = req.body;
	console.log(data);
	const images = data.images.trim() || '';
	const tags = data.tags || '';
	const id = parseInt(req.params.id);
	if (data.user && data.gps && data.tags && data.title && data.content && typeof id === 'number') {
		const odpoved = await crudManager.update(
			id,
			<string>data.user,
			<string>data.gps,
			<string>images,
			<string>tags,
			<string>data.title,
			<string>data.content
		);
		res.send(odpoved);
	}
	else {
		res.send(false);
	}
});

// read all locations
app.get('/api/locations', async (req: express.Request, res: express.Response) => {
	const data = await crudManager.readAll();
	res.send(JSON.stringify(data));
});

// read one location
app.get('/api/location/:id', async (req: express.Request, res: express.Response) => {
	const data = await crudManager.readOne(parseInt(req.params.id));
	res.send(JSON.stringify(data));
});

// delete location
app.delete('/api/location/:id', async (req: express.Request, res: express.Response) => {
	const data = await crudManager.delete(parseInt(req.params.id));
	res.send(data);
});

app.listen(port, () => {
	console.log(`App is running on http://127.0.0.1:${port}`);
});
