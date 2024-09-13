const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.URL)
    .then(() => {console.log("Connection established successfully.")})
    .catch((err) => {
        console.log('Exited with error', err);
        process.exit(1);

    });
}
module.exports = dbConnect;