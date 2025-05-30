const fs = require('fs');
const path = require('path');

exports.handler = async function () {
  const galleryPath = path.join(__dirname, '../../gallery');

  try {
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
      body: JSON.stringify({ error: 'Unable to read gallery folders' })
    };
  }
};
