const { model, Schema } = require("mongoose");
const userRoles = require("../constants/userRoles");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    year: {
      type: Number,
    },
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model("User", userSchema);

module.exports = User;
