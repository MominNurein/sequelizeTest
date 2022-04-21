const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

dotenv.config({ path: path.join(__dirname, './config/config.env') });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

//  Database connection
require('./src/database/connection');

// set the view engine to ejs
app.set('views', './src/views');
app.set('view engine', 'ejs');

// set the AUTH routes
app.use('/auth', require('./src/routes/auth'));

app.get('/', (req, res) => {
	res.render('index');
});
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
