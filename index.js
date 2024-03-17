const { S3 } = require('aws-sdk');

const getSignedUrlForUpload = async (config) => {
    // Construct the object key by combining the type and fileName------
    const { fileName, type = 'images' } = config;
    const key = `${type}/${fileName}`;

    const params = {
        Bucket: config.BUCKET_NAME,
        Key: key,
        Expires: 300,
        ContentType: config.contentType,
    };

    // Set the parameters for generating the pre-signed URL------
    if (config.acl) {
        params.ACL = config.acl;
    }
    // Generate the pre-signed URL------
    const url = await new Promise((resolve, reject) => {
        const s3 = new S3({
            region: config.REGION,
            signatureVersion: 'v4',
        });
        // Generate the pre-signed URL for 'putObject' operation------
        s3.getSignedUrl('putObject', params, (err, result) => {
            if (err) reject(err);

            resolve(result);
        });
    });
    return url;
};

module.exports = {
    getSignedUrlForUpload
}