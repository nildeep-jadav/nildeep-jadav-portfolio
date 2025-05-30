const fs = require('fs');
const path = require('path');

exports.handler = async function (event) {
  const category = event.queryStringParameters.category;
  const galleryPath = path.join(process.cwd(), 'public', 'gallery', category); // ✅ FIXED

  try {
    const files = fs.readdirSync(galleryPath).filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    const urls = files.map(file =>
      `/gallery/${category}/${file}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(urls)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

