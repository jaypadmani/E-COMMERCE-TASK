require("dotenv").config({
  path: "./.env",
});
const { app } = require("./app");
const db = require("./db/index");
const {setupTables} = require("./setup");

db.connect()
  .then(async () => {
    console.log("PostgreSQL Connection SUCCESS!!!");
    await setupTables();

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });

    app.on("error", (err) => {
      console.log("Error:", err);
      throw err;
    });
  })
  .catch((err) => {
    console.log("PostgreSQL Connection FAILED!!:", err);
  });
