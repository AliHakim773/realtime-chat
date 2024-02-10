import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const genderEnum = ["male", "female"]

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: "Username already exists",
      trim: true,
    },
    fullName: {
      type: String,
      required: "Full name is required",
      trim: true,
    },
    password: {
      type: String,
      required: "Password is required",
      trim: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: "Gender is required",
      enum: genderEnum,
    },
    profilePic: {
      type: String,
      default:
        "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg",
      trim: true,
    },
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      next()
    } catch (error) {
      console.log("Error in Hasing Password")
      next(error)
    }
  }
})

const User = mongoose.model("User", UserSchema)

export default User
