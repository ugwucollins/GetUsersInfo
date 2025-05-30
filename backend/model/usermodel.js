import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  surName: {
    type: String,
    required: true,
  },

  otherName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  LGA: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
    default: "USER",
  },
});

const UsersModel = mongoose.model("users", userSchema);
export default UsersModel;
