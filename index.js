const AWS = require('aws-sdk');

const generateSignedUploadUrl = async (config) => {

    try {
        const { BUCKET_NAME, REGION, acl, fileName, contentType, type } = config;

        // Initialize the S3 client
        const s3 = new AWS.S3({
            region: REGION,
            signatureVersion: 'v4',
        });

        // Key is formed by combining the type and fileName
        const key = `${type}/${fileName}`;

        // Parameters for generating the signed URL
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
            Expires: 300,
            ContentType: contentType,
        };

        // Set ACL if provided
        if (acl) {
            params.ACL = acl;
        }

        // Generate the signed URL
        const signedUrl = await new Promise((resolve, reject) => {
            s3.getSignedUrl('putObject', params, (err, url) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(url);
                }
            });
        });

        return signedUrl;
    } catch (error) {
        throw error;
    }
};

const config = {
    BUCKET_NAME: 'image-upload-feature',
    REGION: 'ap-south-1',
    acl: 'public-read',
    fileName: "hello",
    contentType: "image/jpg",
    type: 'images',
};
generateSignedUploadUrl(config).then((res) => {
    console.log("AWS generated signed url", res);
});

// export { generateSignedUploadUrl };
