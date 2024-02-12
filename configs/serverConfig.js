const serverConfig = {
  mongoUri: process.env.DB ?? "",
  port: process.env.PORT ?? 3001,
};

module.exports = serverConfig;
