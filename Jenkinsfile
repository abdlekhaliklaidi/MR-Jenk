pipeline {

    agent any

    environment {
        COMPOSE_FILE = "docker-compose.yml"
        ENV_FILE = ".env"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }


        stage('Backend Tests') {

            parallel {

                stage('User Service') {
                    environment {
                        JWT_SECRET = 'test-secret-key-test-secret-key-test-secret-key-123456'
                        SPRING_DATA_MONGODB_URI = 'mongodb://localhost/test'
                        SPRING_KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'
                        SPRING_DATA_REDIS_HOST = 'localhost'
                    }
                    steps {
                        sh '''
                        cd user_service
                        chmod +x mvnw
                        ./mvnw test
                        '''
                    }
                }


                stage('Product Service') {
                    environment {
                        MEDIA_SERVICE_URL = 'http://media-service:8083'
                        SPRING_DATA_MONGODB_URI = 'mongodb://localhost/test'
                        SPRING_KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'
                    }
                    steps {
                        sh '''
                        cd product_service
                        chmod +x mvnw
                        ./mvnw test
                        '''
                    }
                }


                stage('Gateway Service') {
                    environment {
                        JWT_SECRET = 'test-secret-key-test-secret-key-test-secret-key-123456'
                        SSL_KEYSTORE_PASSWORD = 'changeit'

                        USER_SERVICE_URL = 'http://localhost:8081'
                        PRODUCT_SERVICE_URL = 'http://localhost:8082'
                        MEDIA_SERVICE_URL = 'http://localhost:8083'
                    }
                    steps {
                        sh '''
                        cd gateway_service
                        chmod +x mvnw
                        ./mvnw test
                        '''
                    }
                }


                stage('Media Service') {
                    steps {
                        sh '''
                        cd media_service
                        ./mvnw test
                        '''
                    }
                }

            }
        }


        stage('Frontend Test') {
    agent {
        docker {
            image 'node:20-bookworm'
            reuseNode true
        }
    }

    steps {
        sh '''
        apt-get update
        apt-get install -y chromium

        export CHROME_BIN=/usr/bin/chromium

        cd client

        npm ci

        CI=true npx ng test \
          --watch=false \
          --browsers=ChromeHeadlessCI
        '''
    }
}

        
        stage('Docker Build') {
    steps {
        sh '''
        cat > .env <<EOF
JWT_SECRET=mysecretkeymysecretkeymysecretkey123456789012345678901234567890
SSL_KEYSTORE_PASSWORD=changeit
KAFKA_CLUSTER_ID=XUsgXG_aQECnYlwcwmQhtQ
USER_DB_URI=mongodb://mongodb:27017/user_db
PRODUCT_DB_URI=mongodb://mongodb:27017/product_db
REDIS_HOST=redis
KAFKA_HOST=kafka:9092
MEDIA_SERVICE_URL=http://media-service:8083/
USER_SERVICE_URL=http://user-service:8081/
PRODUCT_SERVICE_URL=http://product-service:8082/
EOF

        docker compose build
        '''
    }
}


        stage('Deploy') {
            steps {
                sh '''
                docker compose --env-file .env down || true
                docker compose --env-file .env up -d
                '''
            }

            post {
        failure {
            sh '''
            docker compose --env-file .env down
            docker compose --env-file .env up -d
            '''
        }
    }
        }

    }


    post {

        success {
            echo "🚀 CI/CD SUCCESS"
        }

        failure {
            echo "❌ CI/CD FAILED"
        }

    }

}