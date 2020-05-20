const router = require("express").Router();
const docRoutes = require("./doctors");

// Book routes
router.use("/doctors", docRoutes);

module.exports = router;
