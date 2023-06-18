const express = require("express");
const app = express();
const cors = require("cors");

// const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/v1/job.route')

//schema design
//jobcategory schema
// const jobCategorySchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please provide a category name"],
//     trim: true,
//     unique: [true, "Category name must be unique "],
//     minLength: [4, "Name must be at least 4 characters."],
//     maxLength: [30, "Name not to be larger than 30  characters."],
//   },
//   description: {
//     type: String,
//     required: [true, "Please category description"],
//   }
// })


// // mongoose middlewares for saving data: pre / post
// jobSchema.pre('save', function (next) {
//   // this=>
//   console.log("Before Saving Data");
//   if (this.noOfPost === 0) {
//     this.status = 'close'
//   }
//   next()
// })

// jobSchema.post('save', function (doc, next) {
//   console.log("After Saving Data");
//   next()
// })

// jobSchema.methods.logger = function () {
//   console.log(`Data saved for ${this.title}`);
// }


// to save data into database

// to get/post data from the database
app.use('/api/v1/jobs', productRoute)

app.get("/", (req, res) => {
  res.send("Careersbangladesh server is running ~~~~~~~ YaY!");
});


module.exports = app;