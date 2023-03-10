import SecretBaker from 'serverless-secret-baker';
import { serverless } from './secretBakerServerless';
import { decryptSecretData } from './kms';


export const getSecretData = async (path) => {
    const param = await getParam(path);
    if (param?.Value && param?.ARN) {
        const data = await decryptSecretData(param.Value, param.ARN);
        return data;
    }
};

export const getData = async (path) => {
    const param = await getParam(path);
    return param?.Value;
};

export const getParam = async (path) => {
    serverless.setKeys({ key: path });
    const secretBaker = new SecretBaker(serverless);
    return await secretBaker.getParameterFromSsm(path);
};