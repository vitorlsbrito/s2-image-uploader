const { Router } = require('express');
const multer = require('multer');

const UploadMiddleware = require('./app/middlewares/UploadMiddleware');
const FileController = require('./app/controllers/FileController');

const router = Router();

router.get('/', (req, res) => {
    res.json({ ok: true });
});

router.post('/file', UploadMiddleware, FileController.upload);
router.get('/file/:id', FileController.read);

module.exports = router;
