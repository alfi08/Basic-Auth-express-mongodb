const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const AppError = require('../utils/AppError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  // create random file name
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  // if folder does not exist, create new
  if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');

  await sharp(req.file.buffer)
    .resize(300)
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/${req.file.filename}`);
  next();  
};
