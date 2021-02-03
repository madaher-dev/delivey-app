const variables = {
  development: {
    url: 'http://192.168.1.10:8000',
    googleApiKey: 'AIzaSyBqyFSfbGBm5vpb5HyI6aRH5Z_O9LKCa-k',
  },
  production: {
    url: 'http://192.168.1.10:8000',
    googleApiKey: 'AIzaSyBqyFSfbGBm5vpb5HyI6aRH5Z_O9LKCa-k',
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
