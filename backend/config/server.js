module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ed7ec8a23cbe0b7593bd63da3b1d0b06'),
    },
  },
});
