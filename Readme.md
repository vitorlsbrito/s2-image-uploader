<img src="https://vlsbr-s3-image-uploader.herokuapp.com/file/aws_s3_image_uploader.png" style="width:100%; height:auto;">

<h2>Upload and retrieve images from S3 need to be simple!</h2>

## What
A REST API with two endpoints to upload and retrieve file images to AWS S3.

## Packages
- aws-sdk @ 2.841.0
- dotenv @ 8.2.0
- express @ 4.17.1
- multer @ 1.4.2
- uuid @ 8.3.2

## How to use
1. Clone the repository;
2. Open the terminal;
3. Run "yarn";
4. Create a .env file with PORT, AWS_ID, AWS_SECRET and AWS_BUCKET_NAME fields;
5. Run "yarn dev";
6. To upload, make a POST request to "/file", with a file nammed ˜file";
7. To read, make a GET request to "/file/:id", replacing the ":id" to a file id;