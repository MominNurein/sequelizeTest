const User = require('../../models/User')(sequelize);
const Post = require('../../models/Post')(sequelize);

const ErrorHandler = (err) => {
	console.error('Error : ' + err);
};

//							Register
exports.register = async (req, res, next) => {
	if (!req.body.username || !req.body.password) {
		console.log('name and password is required !');
		res.status(400).send({ msg: 'name and password is required !' });
	} else {
		const found = await User.findOne({
			where: { username: req.body.username },
		});
		if (found) {
			console.log('Username already exist !');
			res.status(400).send('Username already exist !');
		} else {
			const user = await User.create({
				username: req.body.username,
				password: req.body.password,
			}).catch(ErrorHandler);

			//! THIS COMMENTED PART OF CODE THROWS AN ERROR ON CONSOLE ABOUT MYSQL SERVE VERSION WITH CURRENT SEQUELIZE VERSION !
			const post = await Post.create({
				title: 'Welcome to Facebook',
				content: 'Testing functionality of baby server xD .',
				user_id: user.id,
			}).catch(ErrorHandler);
			console.log('User Created Successfully !');

			res.status(200).send('User Created Successfully !');
		}
	}
};

// 					Login
exports.login = async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = await User.findOne({
		where: { username: username, password: password },
	});

	if (user) {
		const users = await User.findAll({
			include: [Post],
		});
		res.json({ users });
		users.forEach((user) => {
			console.log(user.username);
		});
		setTimeout(() => {
			res.render('dashboard', { users });
		}, 1000);
	} else {
		console.log('Wrong username or password !');
		res.send('Wrong username or password !');
	}
};
