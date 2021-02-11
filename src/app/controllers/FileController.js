require('dotenv').config();
const { v4: uuid } = require('uuid');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});

class FileController {
    async upload(req, res) {
        const { file } = req;

        const fileName = file.originalname;
        let fileType = fileName.split('.');
        fileType = fileType[fileType.length - 1].toLowerCase();

        console.log(fileType);

        if (!(['tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'png', 'gif', 'eps', 'webp'].includes(fileType))) {
            return res.status(500).json({ error: 'Only images are accepted' });
        }

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${ uuid() }.${ fileType }`,
            Body: file.buffer
        };

        s3.upload(params, (err, data) => {
           if (err) {
               res.status(500).send(err);
           }

           res.status(200).json({ id: data.key });
        });
    }

    async read(req, res) {
        const { id } = req.params;

        s3.getObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: id
        }, (err, data) => {
            if (err) {
                res.send(err);
            }

            const file = Buffer.from(data.Body, 'base64');

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': file.length
            });

           res.end(file); 
        });
    }
}

module.exports = new FileController();
