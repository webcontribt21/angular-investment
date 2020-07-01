pipeline {

    environment {
        ****_PROJECT = "my-****"
        ****_BUSINESS = "service"

        // env for sentry-cli (sourcemap upload)
        SENTRY_AUTH_TOKEN = credentials("sentry-auth-token")
        SENTRY_PROJECT = "${env.****_PROJECT}"

        DOMAIN_NAME = "my.${env.DEFAULT_DE_DOMAIN}"
        COOKIE_DOMAIN = ".${env.DEFAULT_DE_DOMAIN}"
        API_URL = "https://api.${env.DEFAULT_COM_DOMAIN}"
        AUTH_URL = "https://auth.${env.DEFAULT_DE_DOMAIN}/auth"
        AUTH_CLIENT_ID = "my-****"
        WEBSITE_URL = "https://www.${env.DEFAULT_DE_DOMAIN}"
    }

    options {
        buildDiscarder(logRotator(
            daysToKeepStr: env.DEFAULT_DAYS_TO_KEEP,
            numToKeepStr: env.DEFAULT_BUILDS_TO_KEEP)
        )
        disableConcurrentBuilds()
        timeout(time: 2, unit: 'HOURS')
    }

    agent { label 'ec2-slave-medium' }

    stages {
        stage('Dev variables') {
            when {
                expression {
                    return env.ENVIRONMENT_NAME == 'dev'
                }
            }
            steps {
                script {
                    // get current version
                    CURRENT_VERSION = sh (script: 'echo "const version = require(\'./package.json\').version;process.stdout.write(version);" | node', returnStdout: true)
                    // append jenkins build number
                    NEW_VERSION = "$CURRENT_VERSION-$BUILD_NUMBER"

                    ENVIRONMENT_LONGNAME = 'development'
                    GTM_ID = "GTM-N5MSZJF"
                    OPTIONAL_CERTIFICATE_ARN = ""
                }
                sh "yarn version --no-git-tag-version --new-version $NEW_VERSION"
            }
        }

        stage('Prod variables') {
            when {
                expression {
                    return env.ENVIRONMENT_NAME == 'prod'
                }
            }
            steps {
                script {
                    ENVIRONMENT_LONGNAME = 'production'
                    GTM_ID = "GTM-W5C36WV"
                    OPTIONAL_CERTIFICATE_ARN = "arn:aws:acm:us-east-1:342416935551:certificate/4a05338b-18a5-4c6e-bb40-ef7e8289003e"
                }
            }
        }

        stage('Validate') {
            steps {
                withAWS(
                    role: env.ASSUME_JENKINS_IAM_ROLE,
                    roleAccount: env.****_DEFAULT_AWS_ACCOUNT,
                    region: env.****_DEFAULT_AWS_REGION
                ) {
                    // validate CloudFormation templates
                    cfnValidate(file: 'cloudformation/srv-my****-assets.yaml')
                    cfnValidate(file: 'cloudformation/srv-my****-cloudfront.yaml')
                }
            }
        }

        stage('Install') {
            steps {
                sh "yarn --version"
                sh "node --version"
                sh "yarn install --frozen-lockfile --mutex network"
                sh "yarn list"
            }
        }
        /*
        stage('Verify Dependencies') {
            steps {
                sh "yarn check"
                sh "yarn check --integrity"
            }
        }
        */
        stage('Lint') {
            steps {
                sh "yarn lint"
                sh "yarn pretty"
            }
        }

        /* TODO update for V2
        stage('Unit Tests') {
            options {
                timeout(time: 15, unit: 'MINUTES')
            }
            steps {
                withEnv(["SENTRY_ENV=${SENTRY_ENV}", "SENTRY_URL=${SENTRY_URL}", "GTM_ID=${GTM_ID}"]) {
                    sh "yarn ci-test"
                }
            }
        }
        */

        stage('Package Application') {
            steps {
                sh "yarn build -c=${ENVIRONMENT_LONGNAME}"
            }
        }

        stage('Update CloudFormation') {
            steps {
                // Update CloudFront in US Virginia region
                withAWS(
                    role: env.ASSUME_JENKINS_IAM_ROLE,
                    roleAccount: env.****_DEFAULT_AWS_ACCOUNT,
                    region: 'us-east-1'
                ) {
                    cfnUpdate(
                        stack: 'srv-my****-cloudfront',
                        file: 'cloudformation/srv-my****-cloudfront.yaml',
                        timeoutInMinutes: 30,
                        params: [
                            "DomainName=$DOMAIN_NAME",
                            "CertificateArn=$OPTIONAL_CERTIFICATE_ARN"
                        ],
                        tags: [
                            "****:business=$****_BUSINESS",
                            "****:project=$****_PROJECT"
                    ])

                    script {
                        CLOUDFRONT_DNS = cfnDescribe(stack:'srv-my****-cloudfront')['DistributionDns']
                        CLOUDFRONT_ID = cfnDescribe(stack:'srv-my****-cloudfront')['DistributionId']
                    }
                }

                withAWS(
                        role: env.ASSUME_JENKINS_IAM_ROLE,
                        roleAccount: env.****_DEFAULT_AWS_ACCOUNT,
                        region: env.****_DEFAULT_AWS_REGION
                ) {
                    cfnUpdate(
                        stack: 'srv-my****-assets',
                        file: 'cloudformation/srv-my****-assets.yaml',
                        timeoutInMinutes: 10,
                        params: [
                            "DomainName=$DOMAIN_NAME",
                            "CloudFrontDns=$CLOUDFRONT_DNS"
                        ],
                        tags: [
                            "****:business=$****_BUSINESS",
                            "****:project=$****_PROJECT"
                    ])
                }
            }
        }

        stage('Upload to Sentry') {
            options {
                retry(2)
            }
            steps {
                sh "yarn sentry-release"
                sh "yarn sentry-commits --commit \"****/my-****@$env.GIT_COMMIT\""
                sh "yarn sentry-upload"
                sh "find ./dist -name \\*.map -delete"
                sh "find ./dist -name \\*.js -exec sed -i '/^\\/\\/#.*/d' '{}' \\;"
                sh "find ./dist -name \\*.css -exec sed -i '/^\\/\\*#.*/d' '{}' \\;"
            }
        }

        stage('Deploy to S3') {
            steps {
                withAWS(
                    role: env.ASSUME_JENKINS_IAM_ROLE,
                    roleAccount: env.****_DEFAULT_AWS_ACCOUNT,
                    region: env.****_DEFAULT_AWS_REGION
                ) {
                    script {
                        // Take the deployment bucket name from created CloudFormation stack
                        BUCKET = cfnDescribe(stack:'srv-my****-assets')['Bucket']

                        // delete old content from the bucket
                        files = s3FindFiles(bucket: "$BUCKET", onlyFiles: true)
                        for (Object fileToDelete: files) {
                            s3Delete(
                                bucket: "$BUCKET",
                                path: "$fileToDelete"
                            )
                        }
                        s3Delete(
                            bucket: "$BUCKET",
                            path: "assets/"
                        )
                    }

                    // upload folder content to S3
                    s3Upload(
                        file: "dist",
                        bucket: "$BUCKET",
                        path: "",
                        acl: "PublicRead",
                        cacheControl:'public,max-age=31536000'
                    )

                    // overwrite index.html with no cache
                    s3Upload(
                        file: "dist/index.html",
                        bucket: "$BUCKET",
                        path: "index.html",
                        acl: "PublicRead",
                        cacheControl:'public,max-age=0'
                    )
                }
            }
        }

        stage('Invalidate CloudFront') {
            steps {
                withAWS(
                    role: env.ASSUME_JENKINS_IAM_ROLE,
                    roleAccount: env.****_DEFAULT_AWS_ACCOUNT
                ) {
                    cfInvalidate(distribution: CLOUDFRONT_ID, paths:['/*'])
                }
            }
        }
    }
}
