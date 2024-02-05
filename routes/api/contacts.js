const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const validationSchema = require("../../validation/joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToFind = await getContactById(contactId);
    if (contactToFind) {
      res.status(200).json(contactToFind);
    } else {
      res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required field(s)" });
    }

    const dataToAdd = validationSchema.validate({ name, email, phone });
    if (dataToAdd.error) {
      return res
        .status(400)
        .json({ message: dataToAdd.error.details[0].message });
    }
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await removeContact(contactId);
    if (contactToRemove) {
      res.status(200).json({ message: `contact with id ${contactId} deleted` });
    } else {
      res
        .status(404)
        .json({ message: `Contact with id ${contactId} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    if (!body) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const dataToUpdate = validationSchema.validate(body);
    if (dataToUpdate.error) {
      return res
        .status(400)
        .json({ message: dataToUpdate.error.details[0].message });
    } else {
      const updatedContact = await updateContact(contactId, body);

      if (!updatedContact) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
