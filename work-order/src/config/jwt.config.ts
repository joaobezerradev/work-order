export default () => ({
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
  },
});
