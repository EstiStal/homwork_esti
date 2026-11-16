const userSchema =require('../modules/user.model');
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userSchema.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
exports.singUp = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        const newUser = new userSchema({ name, email, phone, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};
exports.singIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        const isMatch = await userSchema.checkPassword(password, user.password);
        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid password');
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        next(error);
    }
};
