const multer = require('multer');
const fsExtra = require('fs-extra');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        let destinationPath = "./uploads/"; // chemin par défaut
        let id = null;
        if (req.user && req.user.userId) {
            id = req.user.userId.toString();
            if (req.uploadType === "profile") {
                destinationPath = path.join(destinationPath, "profiles", id);
            } else if (req.uploadType === "project") {
                destinationPath = path.join(destinationPath, "projects", id);
            }
        }


        if (!id) {
            // Si aucun ID n'est défini, nous levons une erreur.
            cb(new Error('L’ID de l’utilisateur ou du projet est indéfini.'));
            return;
        }
        // S'assurer que le dossier existe (le créer s'il n'existe pas)
        try {
            await fsExtra.ensureDir(destinationPath);
            cb(null, destinationPath);
        } catch (err) {
            cb(new Error('Erreur lors de la création du dossier de destination.'));
        }

        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        if (!req.user || !req.user.userId) {
            cb(new Error('L’ID de l’utilisateur est indéfini.'));
            return;
        }
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname);
        cb(null, `${req.user.userId}_${timestamp}${fileExtension}`);
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

            // Si le fichier a été correctement téléchargé, ajoutez son chemin au corps de la requête.
            if (req.file) {
                const fullPath = path.join(req.file.destination, req.file.filename);
                req.body.image = fullPath;
            }

            next();
        });
    };
};

module.exports = adaptiveUpload;
