export default () => ({
  api: {
    url: process.env.URL_BACKEND,
    port: process.env.PORT,
  },
  web: {
    url: process.env.URL_FRONTEND,
  },
});
