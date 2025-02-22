import { S3Client} from "@aws-sdk/client-s3";  
import dotenv from "dotenv";

dotenv.config();
const AWS_ACCESS_KEY=process.env.AWS_ACCESS_KEY
const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY
const AWS_REGION=process.env.AWS_REGION


const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId:AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
});

export default s3;