const fs = require('fs');
const path = require('path');

exports.handler = async function (event) {
  const category = event.queryStringParameters.category;
  const galleryDir = path.join(__dirname, '../../gallery', category);

  try {
    const files = fs.readdirSync(galleryDir).filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    const urls = files.map(file => `/gallery/${category}/${file}`);

    return {
      statusCode: 200,
      body: JSON.stringify(urls)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to load images' })
    };
  }
};
