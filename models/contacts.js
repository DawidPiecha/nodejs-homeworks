const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log("Reading contact list error:", error.message);
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log("Getting contact by id error:", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [deletedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
    return deletedContact;
  } catch (error) {
    console.log("Removing contact error:", error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const { name, email, phone } = body;
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log("Adding contact error:", error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
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
};
