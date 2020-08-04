"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const CRUDManager_1 = require("./CRUDManager");
const multer = require("multer");
const path = require("path");
const port = 8000;
const crudManager = new CRUDManager_1.default();
// Create a new express app instance
const app = express();
app.use(express.json());
// for parsing application/json
//app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(path.extname(file.originalname), '') + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
app.use(express.static(path.join(__dirname, '../public')));
app.post('/api/savedata', upload.single('file'), function (req, res) {
    console.log('Uploade Successful ', req.file, req.body);
    res.send(req.file.filename);
});
// create location
app.post('/api/location', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const data = req.body;
    console.log(data);
    const images = data.images || '';
    const tags = data.tags || '';
    if (data.user && data.gps && data.tags && data.title && data.content) {
        const odpoved = yield crudManager.create(data.user, data.gps, images, tags, data.title, data.content);
        res.send(odpoved);
        console.log('location create');
    }
    else {
        res.send(false);
        console.log('location create err');
    }
}));
// upload image
app.post('/api/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('upload:', req);
    res.send(true);
}));
// update location
app.put('/api/location/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('put');
    const data = req.body;
    console.log(data);
    const images = data.images.trim() || '';
    const tags = data.tags || '';
    const id = parseInt(req.params.id);
    if (data.user && data.gps && data.tags && data.title && data.content && typeof id === 'number') {
        const odpoved = yield crudManager.update(id, data.user, data.gps, images, tags, data.title, data.content);
        res.send(odpoved);
    }
    else {
        res.send(false);
    }
}));
// read all locations
app.get('/api/locations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield crudManager.readAll();
    res.send(JSON.stringify(data));
}));
// read one location
app.get('/api/location/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield crudManager.readOne(parseInt(req.params.id));
    res.send(JSON.stringify(data));
}));
// delete location
app.delete('/api/location/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield crudManager.delete(parseInt(req.params.id));
    res.send(data);
}));
app.listen(port, () => {
    console.log(`App is running on http://127.0.0.1:${port}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1DQUFvQztBQUNwQywwQ0FBMkM7QUFDM0MsK0NBQXdDO0FBQ3hDLGlDQUFrQztBQUNsQyw2QkFBOEI7QUFFOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLE1BQU0sV0FBVyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFDO0FBRXRDLG9DQUFvQztBQUNwQyxNQUFNLEdBQUcsR0FBd0IsT0FBTyxFQUFFLENBQUM7QUFDM0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QiwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLGdEQUFnRDtBQUNoRCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRW5ELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDbEMsV0FBVyxFQUFFLG1CQUFtQjtJQUNoQyxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDL0IsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDL0gsQ0FBQztDQUNELENBQUMsQ0FBQztBQUVILE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBRTVDLEdBQUcsQ0FBQyxHQUFHLENB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