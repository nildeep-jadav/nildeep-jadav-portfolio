const fs = require('fs');
const path = require('path');

exports.handler = async function () {
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery'); // ✅ FIXED

    const folders = fs.readdirSync(galleryPath).filter(name =>
      fs.statSync(path.join(galleryPath, name)).isDirectory()
    );

    return {
      statusCode: 200,
      body: JSON.stringify(folders)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
