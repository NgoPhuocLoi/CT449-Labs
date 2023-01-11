const ApiError = require("../helpers/api-error");
const MongoDB = require("../helpers/mongodb");
const ContactService = require("../services/contact.service");

const contactController = {
  create: async (req, res, next) => {
    if (!req.body?.name) return next(new ApiError(400, "Name cannot be empty"));
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.create(req.body);
      return res.json({
        message: "Create successfully",
        contact: document,
      });
    } catch (error) {
      next(new ApiError(500, "An error occur while creating the contact"));
    }
  },
  findAll: async (req, res, next) => {
    let documents = [];

    try {
      const contactService = new ContactService(MongoDB.client);
      const { name } = req.query;
      if (name) {
        documents = await contactService.findByName(name);
      } else {
        documents = await contactService.find({});
      }

      res.json({
        contacts: documents,
      });
    } catch (error) {
      next(new ApiError(500, "An error occur while retrieving contacts"));
    }
  },
  findOne: async (req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.findById(req.params.id);
      if (!document) {
        return next(new ApiError(404, "Contact not found"));
      }
      res.json({
        contact: document,
      });
    } catch (error) {
      next(
        new ApiError(
          500,
          "An error occur while retrieving contact with id=" + req.params.id
        )
      );
    }
  },
  update: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Data to update cannot be empty"));
    }
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.update(req.params.id, req.body);
      if (!document) return next(new ApiError(404, "Contact not found"));

      res.json({
        message: "Update successfully",
        contact: document,
      });
    } catch (error) {
      next(new ApiError(500, "An error occur while updating contact"));
    }
  },
  delete: async (req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.delete(req.params.id);
      if (!document) return next(new ApiError(400, "Contact not found"));

      res.json({
        message: "Delete successfully",
      });
    } catch (error) {
      next(new ApiError(500, "An error occur while deleting contact"));
    }
  },
  deleteAll: async (_req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
      const deletedCount = await contactService.deleteAll();
      res.json({
        message: deletedCount + " contacts were deleted successfully",
      });
    } catch (error) {
      next(new ApiError(500, "An error occur while deleting all contacts"));
    }
  },
  findAllFavorite: async (_req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
      const documents = await contactService.findFavorite();
      res.json({
        favoriteContacts: documents,
      });
    } catch (error) {
      next(
        new ApiError(500, "An error occur while retrieving favorite contacts")
      );
    }
  },
};

module.exports = contactController;
