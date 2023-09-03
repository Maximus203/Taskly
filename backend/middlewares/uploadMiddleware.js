const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destinationPath = "./uploads/"; // chemin par défaut

        if (req.uploadType === "profile") {
            destinationPath = path.join(destinationPath, "profiles", req.user.id.toString());
        } else if (req.uploadType === "project") {
            destinationPath = path.join(destinationPath, "projects", req.project.id.toString());
        }

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        cb(null, `${req.user.id}_${timestamp}${fileExtension}`);
    }
});

// Définir les limites et le filtrage de fichiers
const uploadLimits = {
    fileSize: 5 * 1024 * 1024 // 5 MB
};

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Seuls les images au format jpeg, jpg, png et gif sont autorisés.'));
    }
};

const upload = multer({
    storage: diskStorage,
    limits: uploadLimits,
    fileFilter: fileFilter
});

const adaptiveUpload = (type) => {
    return (req, res, next) => {
        req.uploadType = type;
        upload.single('image')(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({
                        success: false,
                        message: 'Taille du fichier trop importante. La limite est de 5 MB.'
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: 'Une erreur s’est produite lors du téléchargement du fichier.'
                });
            } else if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            next();
        });
    };
};

module.exports = adaptiveUpload;
