const express = require("express");
const router = express.Router();
const controller = require("../controller/indexController");
router.get("/", controller.user.getAll);
router.get("/:username", controller.user.getUsername);
router.post("/", controller.user.createNew);
router.put("/:id", controller.user.editAt); // Update route path to include ":id"
router.delete("/:id", controller.user.deleteUser); // Update route path to include ":id"
module.exports = router;