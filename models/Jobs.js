const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

//job schema
const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a job title"],
        trim: true,
        lowercase: true,
        minLength: [4, "Name must be at least 4 characters."],
        maxLength: [50, "Name not to be larger than 30  characters."],
    },

    jobDescription: {
        type: String,
        required: [true, "Please category job description"],
        minLength: [4, "Name must be at least 4 characters."],
        maxLength: [400, "Name not to be larger than 400  characters."],
    },

    jobLocation: {
        type: String,
        required: [true, "Please provide the job location"],
        minLength: [4, "Name must be at least 4 characters."],
        maxLength: [100, "Name not to be larger than 100  characters."],
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

    // jobSeeker: {
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     id: {
    //         type: ObjectId,
    //         ref: "jobSeeker",
    //         required: true,
    //     }
    // },
    employer: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Employer",
            required: true,
        }
    },

    // jobCategories: {
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     _id: {
    //         type: ObjectId,
    //         ref: "Category",
    //         required: true,
    //     }
    // }

}, {
    timestamps: true
},)


//Schema => Model => Query
const Job = mongoose.model('job', jobSchema)

module.exports = Job;