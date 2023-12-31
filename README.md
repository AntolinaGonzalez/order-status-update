
## Requirements

* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
* [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* [Node.js](https://nodejs.dev/en/learn/how-to-install-nodejs/)
* [Docker](https://docs.docker.com/engine/install/)
* Esbuild

> **IMPORTANT:** *esbuild* must be installed in the host machine, not as a dependency of the project. I.e: in Debian run `npm install -g esbuild`.

## First time setup

Authenticate to AWS through the AWS CLI:

```bash
aws configure
```

Create the `.env` files with all the required parameters:

```
Region
Env
```

## Run locally

```bash
sam build

sam local invoke {FUNCTION_NAME} \
-e events/{FUNCTION_EVENT}.json \
--parameter-overrides $(cat .env)

```

```bash


# dev
aws s3api create-bucket \
--bucket order-status-update-dev \
--region sa-east-1 \
--create-bucket-configuration LocationConstraint=us-east-2

# dev
sam deploy \
--config-file ./samconfig.toml \
--config-env dev \
--parameter-overrides $(cat .env.dev)



