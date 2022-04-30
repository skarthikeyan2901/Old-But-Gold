const express = require("express");
require("dotenv").config();
const http = require("http");
const app = express();
const cors = require("cors");

app.use(cors());
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
app.use(express.json());
const mongoose = require("mongoose");
const UserRouter = require('./api/User');
mongoose
    .connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.log(err);
    })

server.listen(PORT, () => {
  console.log("Server is running", PORT);
});

app.get('/',(req,res)=>{
    res.send("Old but Gold!")
})

app.use('/user',UserRouter);