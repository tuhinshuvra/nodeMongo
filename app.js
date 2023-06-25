const express = require("express");
const app = express();
const cors = require("cors");

// const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

const categoriesRoute = require('./routes/v1/jobCategories.route')
const jobsRoute = require('./routes/v1/job.route')
const employersRoute = require('./routes/v1/employer.route')
const jobSeekerRoute = require('./routes/v1/jobSeeker.route')
const applicationRoute = require('./routes/v1/application.route')


// routes
app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v1/jobs', jobsRoute)
app.use('/api/v1/employers', employersRoute)
app.use('/api/v1/jobSeeker', jobSeekerRoute)
app.use('/api/v1/application', applicationRoute)

app.get("/", (req, res) => {
  res.send("Careersbangladesh server is running ~~~~~~~ YaY!");
});


module.exports = app;