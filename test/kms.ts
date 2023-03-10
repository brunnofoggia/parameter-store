import 'dotenv/config';
import { decryptSecretData, getSecretData } from '@/index';
import aws from 'aws-sdk';

export const awsConfig = () => {
    if (!!process.env.IS_TS_NODE) {
        const _config = {
            region: process.env.REGION,
            accessKeyId: process.env.AMZ_ACCESSKEYID,
            secretAccessKey: process.env.AMZ_SECRETACCESSKEY,
        };
        aws.config.update(_config);
    }
};

(async function () {
    awsConfig();
    console.log(await getSecretData('/dev/common/db'));
})();