const form = document.querySelector('form');
const fileInput = document.querySelector('#file-input');
const submitBtn = document.querySelector('#submit-btn');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = fileInput.files[0];
  const filename = `f/${Math.floor(Math.random() * 100000) + 1}${file.name.substring(file.name.lastIndexOf('.'))}`;
  const formData = new FormData();
  formData.append('file', file, filename);

  const response = await fetch('/.netlify/functions/upload', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    window.open(`/${filename}`, '_blank');
  }
});

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
