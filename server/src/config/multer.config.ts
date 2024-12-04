import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: function (req,file ,cb) {
		cb(null, path.join(__dirname,"../../assets")) 
	},

	filename: function (req, file, cb) {
		cb(null,file.originalname);
	},
	// filename: function (req, file, cb) {
	// 	cb(null, Date.now().toString() + "_" + file.originalname);
	// },
});

const upload = multer({ storage: storage });

export default upload;
