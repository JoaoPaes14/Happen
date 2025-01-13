const path = require('path');

module.exports = {
  config: path.resolve(__dirname, 'src', 'config', 'database.ts'),
  modelsPath: path.resolve(__dirname, 'src', 'models'),
};
