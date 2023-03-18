process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      const env = args[0]['process.env'];

      // Agrega las variables de entorno
      env.VUE_APP_API_URL = JSON.stringify(process.env.VUE_APP_API_URL);

      return args;
    });
  },
};
