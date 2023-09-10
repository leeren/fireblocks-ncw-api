import 'dotenv/config';

export enum Env {
	DEV = 'dev',
	STAGING = 'staging',
	PROD = 'prod'
}

enum EnvVar {
	STRING,
	NUMBER,
	BOOLEAN
}

const KEY_FIREBLOCKS_WEBHOOK_PK = 'FIREBLOCKS_WEBHOOK_PUBLIC_KEY';
const KEY_FIREBLOCKS_API_SECRET = 'FIREBLOCKS_API_SECRET';

type EnvVarType = {
	[EnvVar.STRING]: string;
	[EnvVar.NUMBER]: number;
	[EnvVar.BOOLEAN]: boolean;
};

type Config = {
	env: string;
	fireblocksWebhookPublicKey: string;
	fireblocksApiSecret: string;
	fireblocksApiNcwAdmin: string;
	fireblocksApiNcwSigner: string;
	fireblocksApiBase: string;
	dbName: string;
	dbHost: string;
	dbPort: number;
	dbUsername: string;
	dbPassword: string;
};

const handleStringType = (key: string, value: string): string => {
  if (key === 'FIREBLOCKS_WEBHOOK_PUBLIC_KEY' || key === 'FIREBLOCKS_API_SECRET') {
    return value.replace(/\\n/g, '\n');
  }
  return value;
}

const getEnv = <T extends EnvVar>(key: string, type: T, defaultValue?: EnvVarType[T]): EnvVarType[T] => {

	const value = process.env[key] || defaultValue;
	if (value === undefined) {
		throw new Error(`Env var ${key} is not defined.`);
	}
	switch (type) {
		case EnvVar.STRING:
			return handleStringType(key, String(value)) as EnvVarType[T];
    case EnvVar.NUMBER:
      const numberValue = Number(value);
      if (isNaN(numberValue)) {
        throw new Error(`Environment variable ${key} should be a number, but its value is "${value}".`);
      }
      return numberValue as EnvVarType[T];
		case EnvVar.BOOLEAN:
			const stringValue = String(value);
			return (stringValue.toLowerCase() === 'true') as EnvVarType[T];
    default:
      throw new Error(`Unsupported environment variable type ${type} for key ${key}.`);
	}
}

const config: Config = {
	env: getEnv('ENV', EnvVar.STRING),
	fireblocksWebhookPublicKey: getEnv('FIREBLOCKS_WEBHOOK_PUBLIC_KEY', EnvVar.STRING),
	fireblocksApiSecret: getEnv('FIREBLOCKS_API_SECRET', EnvVar.STRING),
	fireblocksApiNcwAdmin: getEnv('FIREBLOCKS_API_KEY_NCW_ADMIN', EnvVar.STRING),
	fireblocksApiNcwSigner: getEnv('FIREBLOCKS_API_KEY_NCW_SIGNER', EnvVar.STRING),
	fireblocksApiBase: getEnv('FIREBLOCKS_API_BASE_URL', EnvVar.STRING),
	dbName: getEnv('DB_HOST', EnvVar.STRING),
	dbUsername: getEnv('DB_USERNAME', EnvVar.STRING),
	dbPassword: getEnv('DB_PASSWORD', EnvVar.STRING),
	dbHost: getEnv('DB_HOST', EnvVar.STRING, '127.0.0.1'),
	dbPort: getEnv('DB_PORT', EnvVar.NUMBER, 6379),
};

if (!Object.values(Env).includes(config.env as Env)) {
	throw new Error(`Unsupported environment ${config.env}.`);
}

export default config;
