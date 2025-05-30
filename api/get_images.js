const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const category = req.query.category;
  const galleryPath = path.join(process.cwd(), 'public', 'gallery', category);

  try {
    const files = fs.readdirSync(galleryPath).filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    const urls = files.map(file => `/gallery/${category}/${file}`);
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
