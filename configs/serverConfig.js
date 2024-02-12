const serverConfig = {
  mongoUri: process.env.DB ?? "",
  port: process.env.PORT ?? 3000,
};

module.exports = serverConfig;
