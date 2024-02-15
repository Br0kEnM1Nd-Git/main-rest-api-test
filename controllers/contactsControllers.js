const { Types } = require("mongoose");
const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const User = require("../models/userModel.js");
const catchAsync = require("../utils/catchAsync.js");
const HttpError = require("../helpers/HttpError.js");

exports.getAllContacts = catchAsync(async (req, res) => {
  const contacts = await User.find().select("name email");

  res.status(200).json(contacts);
});

exports.getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw HttpError(404, "User not found");

  const contact = await User.findById(id);

  if (!contact) throw HttpError(404, "User not found");

  res.status(200).json(contact);
});

exports.deleteContact = catchAsync(async (req, res) => {
  if (!deletedContact) return res.status(404).send({ message: "Not found" });

  res.status(200).send(deletedContact);

  await User.findByIdAndDelete(id);
});

exports.createContact = catchAsync(async (req, res) => {
  const { value: body, error } = createContactSchema.validate(req.body);

  if (error) throw HttpError(400, error.message);

  const userExists = await User.exists({
    email: body.email,
    phone: body.phone,
  });

  if (userExists) throw HttpError(409, "User already exists");

  const newUser = await User.create(body);

  res.status(201).json({ message: "Success", user: newUser });
});

exports.updateContact = catchAsync(async (req, res) => {
  const { value: body, error } = updateContactSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  if (!updatedContact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(updatedContact);

  const updatedUser = await User.findByIdAndUpdate(id, { body }, { new: true });
});
