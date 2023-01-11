const app = require("./src/app");
const config = require("./app.config");
const MongoDB = require("./src/helpers/mongodb");

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("DB is connected");

    app.listen(config.app.PORT, () => {
      console.log("Server is running on port " + config.app.PORT);
    });
  } catch (error) {
    console.log("Cannot connected to the database", error);
    process.exit();
  }
}

startServer();
