const { ObjectId } = require("mongodb");

class ContactService {
  constructor(client) {
    this.Contact = client.db().collection("contacts");
  }

  extractContactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    };

    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
  }

  async create(payload) {
    const contact = this.extractContactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      contact,
      {
        $set: { favorite: contact.favorite === true },
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );

    return result.value;
  }

  async find(filter) {
    const cursor = await this.Contact.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.find({
      _id: ObjectId.isValid(id) ? ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const contact = this.extractContactData(payload);
    const res = await this.Contact.findOneAndUpdate(
      {
        _id: ObjectId.isValid(id) ? ObjectId(id) : null,
      },
      { $set: contact },
      { returnDocument: "after" }
    );

    return res.value;
  }

  async delete(id) {
    const res = await this.Contact.findOneAndDelete({
      _id: ObjectId.isValid(id) ? ObjectId(id) : null,
    });
    return res.value;
  }

  async findFavorite() {
    return this.find({ favorite: true });
  }

  async deleteAll() {
    const res = await this.Contact.deleteMany({});
    return res.deletedCount;
  }
}

module.exports = ContactService;
