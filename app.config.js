const config = {
  app: {
    PORT: process.env.PORT || 5000,
  },
  db: {
    uri: "mongodb+srv://phuocloi11223:0796863758loi@cluster0.0srh0.mongodb.net/contact-book?retryWrites=true&w=majority",
  },
};

module.exports = config;
