const { default: mongoose } = require("mongoose");

//job schema
const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a job title"],
        trim: true,
        minLength: [4, "Name must be at least 4 characters."],
        maxLength: [50, "Name not to be larger than 30  characters."],
    },

    jobDescription: {
        type: String,
        required: [true, "Please category job description"],
        minLength: [4, "Name must be at least 4 characters."],
        maxLength: [400, "Name not to be larger than 400  characters."],
    },

    salary: {
        type: Number,
        required: true,
        min: [0, "Salary can't be negative"]
    },

    jobType: {
        type: String,
        required: true,
        enum: {
            values: ["Full time", "Contactual", "Freelancing"],
            message: "job type can't be {VALUE} its must be fulltime/contactual/freelancing"
        }
    },

    noOfPost: {
        type: Number,
        required: true,
        min: [0, "no of post can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "no of post must be an integer"
    },

    status: {
        type: String,
        required: true,
        enum: {
            values: ["Active", "Inactive", "Close"],
            message: "status can't be {VALUE}"
        }
    },

    // employer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Employer"
    // },

    // jobCategories: [{
    //   name: {
    //     type: String,
    //     required: true,
    //   },
    //   _id: mongoose.Schema.Types.ObjectId,
    // }]



}, {
    timestamps: true
},)


// mongoose middlewares for saving data: pre / post
jobSchema.pre('save', function (next) {
    // this=>
    console.log("Before Saving Data");
    if (this.noOfPost === 0) {
        this.status = 'close'
    }
    next()
})

jobSchema.post('save', function (doc, next) {
    console.log("After Saving Data");
    next()
})

jobSchema.methods.logger = function () {
    console.log(`Data saved for ${this.title}`);
}



//Schema => Model => Query
// product Model
const Job = mongoose.model('job', jobSchema)

module.exports = Job;