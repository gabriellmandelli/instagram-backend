const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Export and config Routes
const app = express();

const server = require('http').Server(app);

// Allows send information on connection in real time 
const io = require('socket.io')(server);

// Connect in MongoDb
mongoose.connect('mongodb+srv://admin:admin@cluster0-rl2ot.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
});

app.use((req, res, next) => {
	req.io = io;

	next();
})

// Cors allow all urls can acess this backend
app.use(cors());

// Create rout to acess static files
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);