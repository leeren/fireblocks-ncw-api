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

type EnvVarType = {
	[EnvVar.STRING]: string;
	[EnvVar.NUMBER]: number;
	[EnvVar.BOOLEAN]: boolean;
};

type Config = {
	env: string;
};

const getEnv = <T extends EnvVar>(key: string, type: T, defaultValue?: EnvVarType[T]): EnvVarType[T] => {

	const value = process.env[key] || defaultValue;
	if (value === undefined) {
		throw new Error(`Env var ${key} is not defined.`);
	}
	switch (type) {
		case EnvVar.STRING:
      return value as EnvVarType[T];
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
};

if (!Object.values(Env).includes(config.env as Env)) {
	throw new Error(`Unsupported environment ${config.env}.`);
}

export default config;

