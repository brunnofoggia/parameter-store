import aws from 'aws-sdk';
import SecretBaker from 'serverless-secret-baker';
import yaml from 'js-yaml';
import fs from 'fs/promises';

const providers = {
    aws: {
        provider: aws,
        async request(serviceClass, methodName, parameters) { // , options
            const service = new this.provider[serviceClass]({ region: process.env.REGION });
            const parameterPromise = service[methodName](parameters).promise();

            return await parameterPromise;
        }
    }
};

export const serverless = {
    getProvider(provider) {
        return providers[provider];
    },
    service: {
        custom: {
            secretBaker: {
                //... importar do .yml
            },
        },
        package: {
            // include: []
        }
    },
    classes: {
        Error: Error,
    },
    cli: {
        log(message) {
            console.log(message);

        }
    },
    async readYml(fileName = 'serverless.yml') {
        try {
            const content = await fs.readFile('./' + fileName);
            // const content = await fs.readFile('@root/'+fileName, 'utf8');

            const doc = yaml.load(content);
            this.service.custom = doc.custom;
            console.log(this.service.custom.secretBaker);
        } catch (err) {
            console.log(err);
        }
    },
    setKeys(keys) {
        this.service.custom.secretBaker = keys;
    }
};