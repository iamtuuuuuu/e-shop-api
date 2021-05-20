const multer = require('multer')

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
}    
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]
    let err = new Error('invalid image type')
    if(isValid) {
      err = null
    }
    cb(err, 'public/uploads')
  },
  filename: function (req, file, cb) { 
    const fileName = file.originalname.split(' ').join('-')
    const extension = FILE_TYPE_MAP[file.mimetype]
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})
 
const upload = multer({ storage: storage })

module.exports = upload