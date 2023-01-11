const app = require("./src/app");
const config = require("./app.config");

const PORT = config.app.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
