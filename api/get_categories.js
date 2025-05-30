const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const galleryPath = path.join(process.cwd(), 'gallery');

  try {
    if (!fs.existsSync(galleryPath)) {
      return res.status(200).json([]);
    }
    const folders = fs.readdirSync(galleryPath).filter(name =>
      fs.statSync(path.join(galleryPath, name)).isDirectory()
    );
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(200).json([]);
  }
}
