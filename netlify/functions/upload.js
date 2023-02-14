// Netlify function to handle file upload
const { create } = require('@netlify/functions');
const fs = require('fs');

exports.handler = create(async (event) => {
  const { file, filename } = event.body;

  const fileBuffer = Buffer.from(file, 'base64');
  fs.writeFileSync(`public/${filename}`, fileBuffer);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
});
