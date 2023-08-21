const model = require("./model/index");
const { Op } = require("sequelize");
const controller = {};

controller.getAll = async function (req, res) {
    try {
        const userData = await model.user.findAll();
        if (userData.length > 0) {
            res
                .status(200)
                .json({ message: "Connection successful", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.getUsername = async function (req, res) {
    try {
        var userData = await model.user.findAll({
            where: { username: { [Op.like]: `%${req.params.username}%` } },
        });
        if (userData.length > 0) {
            res
                .status(200)
                .json({ message: "Connection successful", data: userData });
        } else {
            res.status(200).json({ message: "Connection failed", data: [] });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.createNew = async function (req, res) {
    try {
        //   check data has already been created
        const checkData = await model.user.findAll({
            where: {
                [Op.or]: {
                    username: req.body.username,
                    password: req.body.password,
                },
            },
        });
        if (checkData.length > 0) {
            res.status(500).json({ message: "username/password has already in use" });
        } else {
            await model.user
                .create({
                    username: req.body.username,
                    password: req.body.password,
                    token: req.body.username + req.body.password,
                })
                .then((result) => {
                    res.status(201).json({
                        message: "user successful created", data: {
                            username: req.body.username,
                            password: req.body.password,
                            token: req.body.username + req.body.password,
                        },
                    });
                });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

controller.editAt = async function (req, res) {
    try {
        const user = await model.user.findByPk(req.params.id);
        if (user) {
            const updatedUser = await user.update({
                username: req.body.username,
                password: req.body.password,
                token: req.body.token,
            });
            res.status(200).json({
                message: "Update successful",
                data: updatedUser,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};


controller.deleteUser = async function (req, res) {
    try {
        const user = await model.user.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Deletion failed", error: error.message });
    }
};

module.exports = controller;