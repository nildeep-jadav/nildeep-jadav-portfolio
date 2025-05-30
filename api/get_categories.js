const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery');
    const folders = fs.readdirSync(galleryPath).filter(name =>
      fs.statSync(path.join(galleryPath, name)).isDirectory()
    );
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
