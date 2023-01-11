const router = require("express").Router();
const contactsRouter = require("./contact.route");

router.use("/contacts", contactsRouter);

module.exports = router;
