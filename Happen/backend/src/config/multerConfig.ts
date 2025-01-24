import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname; 
        cb(null, fileName);
    }
});


const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },  
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Somente arquivos de imagem são permitidos.'));
        }
        cb(null, true);
    }
});

export { upload };
