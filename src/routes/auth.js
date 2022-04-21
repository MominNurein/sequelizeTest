const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const User = require('../../models/User')(sequelize);
const jwt = require('jsonwebtoken');

router
	.route('/register')
	.get(async (req, res, next) => {
		res.render('index');
	})
	.post(register);
router
	.route('/login')
	.get((req, res, next) => {
		res.render('login');
	})
	.post(login);

router.route('/test/:id').put(async (req, res) => {
	const user = await User.findByPk(req.params.id);

	if (user) {
		req.body.username
			? (user.username = req.body.username)
			: console.log('No username');
		req.body.password
			? (user.password = req.body.password)
			: console.log('No password');

		user.save();
		res.json({ msg: 'user updated !' });
	} else {
		res.json({ msg: 'NO user found with id ' + req.params.id + ' !' });
	}

	res.end();
});

router.route('/test/:id').get(async (req, res) => {
	const usr = await User.findByPk(req.params.id);

	usr
		? console.log('Founded', usr.dataValues) & res.json(usr)
		: console.log('Not Founded !') &
		  res
				.status(404)
				.json({ msg: `User with id : ${req.params.id} not found .` });

	res.end();
});

router.route('/testjwt').get(async (req, res) => {
	const user = User.findByPk(1);

	const token = jwt.sign(
		{
			id: user.id,
		},
		'shshsh1212'
	);

	const decode = jwt.decode(token);

	res.json({ msg: 'Got the Token !', token, decode });

	res.end(console.log('Token sent'));
});

router.route('/testjwt/:id').get((req, res) => {
	const token = jwt.sign(
		{
			id: req.params.id,
		},
		'shshsh1212'
	);
	console.log(token);

	const decode = jwt.decode(token);
	console.log(decode.id);

	res.json({ msg: 'Got the Token !', token, decode });

	res.end();
});

module.exports = router;
