const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db');
});

// app.get("/", (req, res) => {
//   res.json({ message: "Would you like to buy some hot dog?" });
// });

require('./app/routes/position.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});