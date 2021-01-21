const error = (message) => {
  throw new Error(`NunjucksPlugin: ${message}`);
};

const Logger = {
  error
};

export default Logger;
