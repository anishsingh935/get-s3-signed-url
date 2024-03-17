# Get S3 Signed URL 🚀

A versatile utility for generating pre-signed URLs facilitating file uploads to AWS S3 buckets.

## Installation ⬇️

```bash
npm install get-s3-signed-url
```

## Usage 🛠️

**Define configuration for file upload:**
```bash
const config = {
    BUCKET_NAME: 'BUCKET_NAME',
    REGION: 'REGION',
    acl: 'public-read',
    fileName: 'Product-image',
    contentType: 'contentType',
    type: 'images',
}
```
**Generate pre-signed URL:**
```bash
const { getSignedUrlForUpload } = require('get-s3-signed-url');

// Hit the function with the config as a parameter to get the signed URL
getSignedUrlForUpload(config)
  .then(url => {
    console.log('Pre-signed URL:', url);
    // Hit the signed URL with the PUT method and the media you want to upload
    // After a successful response, your media will be stored in the S3 bucket
  })
  .catch(error => {
    console.error('Error:', error);
  });
```
**Access the stored media with the same signed URL using the extractURLTillPNG function:**
```bash
function extractURLTillPNG(url) {
    const pngIndex =
      url.indexOf(".jpg") !== -1 ? url.indexOf(".jpg") : url.indexOf(".png");
    if (pngIndex !== -1) {
      return url.substring(0, pngIndex + 4); // +4 to include the .png extension
    }
    return null; // Return null if the .png extension is not found in the URL
}
```
## Configuration ⚙️
- **BUCKET_NAME:** The name of the AWS S3 bucket.
- **REGION:** The AWS region of the S3 bucket.
- **fileName:** The name of the file to be uploaded.
- **contentType:** The content type of the file (e.g., 'image/jpeg', 'application/pdf').
- **acl (Optional):** The access control list for the file. Default is 'public-read'.


## Contributing 🤝
Contributions are welcome! Please feel free to open issues or submit pull requests.
