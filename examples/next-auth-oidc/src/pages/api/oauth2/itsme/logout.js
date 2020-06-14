export default (req, res) => {
  res.setHeader('Set-Cookie', [
    `access_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `refresh_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `id_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  ]);
  res.writeHead(302, { Location: '/logout/callback' });
  res.end();
};
