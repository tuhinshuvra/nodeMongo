const { mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        lowercase: true,
        unique: true,
        trim: true,
        required: [true, "Email address is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 3,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                })
            },
            message: "Password {VALUE} is not strong enough"
        },
    },

    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password;
            }
        },
        message: "Password don't match"
    },

    role: {
        type: String,
        emum: ["admin", "job-seeker", "employer"],
        default: "job-seeker",
    },

    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too large"]
    },

    lastName: {
        type: String,
        required: [true, "Please provide a last name"],
        trim: true,
        minLength: [3, "Last name must be at least 3 character"],
        maxLength: [100, "Name is too large"]
    },

    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"]
    },

    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid image url"]
    },

    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"]
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
    {
        timestamps: true
    },
);

// userSchema.pre("save", function (next) {
//     const password = this.password;

//     const hashedPassword = bcrypt.hashSync(password);
//     this.password = hashedPassword;
//     this.confirmPassword = undefined;
//     mext();
// });

userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
}


const User = mongoose.model('user', userSchema)

module.exports = User;