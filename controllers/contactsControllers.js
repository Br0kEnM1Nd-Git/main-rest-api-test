const contactsService = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");

exports.getAllContacts = async (req, res) => {
  res.status(200).json(contacts);
};

exports.getOneContact = async (req, res) => {
  if (contact) return res.status(200).json(contact);

  res.status(404).send({ message: "Not found" });
};

exports.deleteContact = async (req, res) => {
  if (!deletedContact) return res.status(404).send({ message: "Not found" });

  res.status(200).send(deletedContact);
};

exports.createContact = async (req, res) => {
  const { value: body, error } = createContactSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json(newContact);
};

exports.updateContact = async (req, res) => {
  const { value: body, error } = updateContactSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  const updatedContact = await contactsService.updateContact(
    req.params.id,
    body
  );

  if (!updatedContact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(updatedContact);
};
