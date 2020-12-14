import multer from "multer";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const filteTail = file.mimetype.match(/(\w+$)+(?!\/)/g);
    cb(null, file.fieldname + "-" + Date.now() + "." + filteTail);
  },
});

var upload = multer({ storage: storage });

export default upload;
