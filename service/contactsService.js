const { Contact } = require("./schemas/contact.schema");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log("Reading contact list error:", error.message);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactToFindById = await Contact.findOne({ _id: contactId });
    return contactToFindById;
  } catch (error) {
    console.log("Getting contact by id error:", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactToRemove = await Contact.findByIdAndDelete({ _id: contactId });
    return contactToRemove;
  } catch (error) {
    console.log("Removing contact error:", error.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.log("Adding contact error:", error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(
      { _id: contactId },
      body,
      { new: true }
    );
    return contactToUpdate;
  } catch (error) {
    console.error("Updating contact error:", error.message);
  }
};
const updateStatusContact = async (contactId, body) => {
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { favorite: body.favorite },
      { new: true }
    );
    return contactToUpdate;
  } catch (error) {
    console.error("Updating contact error:", error.message);
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
