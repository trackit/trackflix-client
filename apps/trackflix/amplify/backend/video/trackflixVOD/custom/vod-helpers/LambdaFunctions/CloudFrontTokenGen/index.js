const url = require('url');
const aws = require('aws-sdk');
let globalPem;

const handler = async (event) => {
  const response = await signPath(event.source.id);
  return response;
}

const sign = async (pathURL) => {
  const ONE_SEC_IN_MS = 1000;
  const ONE_HOUR_IN_SEC = 3600;
  const EXPIRATION_TIMESTAMP = new Date().getTime() + (ONE_HOUR_IN_SEC * ONE_SEC_IN_MS);
  const epoch = Math.floor(new Date(EXPIRATION_TIMESTAMP).getTime() / ONE_SEC_IN_MS);
  const mkSignPolicy = `{"Statement":[{"Resource":"${pathURL}","Condition":{"DateLessThan":{"AWS:EpochTime":${epoch}}}}]}`;
  if (globalPem === undefined) {
    await getPemKey(process.env.SecretPem);
  }
  const signer = new aws.CloudFront.Signer(process.env.PemID, globalPem);
  const params = {};
  params.url = pathURL;
  params.policy = mkSignPolicy;

  return signer.getSignedUrl(params);
}

async function getPemKey(pemId) {
  const secretsManager = new aws.SecretsManager({ apiVersion: '2017-10-17' });
  const secret = await secretsManager.getSecretValue({ SecretId: pemId }).promise();
  globalPem = secret.SecretBinary;
}


async function signPath(id) {
  /* use wildcard if no specific file is specified */
  const videoPath = `${id}/*`;
  const host = process.env.Host;
  const tobeSigned = url.format({
    protocol: 'https:', slashes: true, host, pathname: videoPath,
  });
  const signedUrl = await sign(tobeSigned);
  const urlParams = signedUrl.replace(`https://${host}/${videoPath}`, '');

  return urlParams;
}

module.exports = {
  signPath,
  handler,
};
