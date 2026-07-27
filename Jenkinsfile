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
        ./mvnw test
        '''
    }
}


                stage('Gateway Service') {
    environment {
        JWT_SECRET = 'test-secret-key-test-secret-key-test-secret-key-123456'
        SSL_KEYSTORE_PASSWORD = 'changeit'
    }
    steps {
        sh '''
        cd gateway_service
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

            steps {

                sh '''
                cd client
                npm install
                npm test -- --watch=false
                '''

            }
        }



        stage('Docker Build') {

    steps {

        sh '''
        docker compose --env-file .env build
        '''

    }

}


stage('Deploy') {

    steps {

        sh '''
        docker compose --env-file .env up -d
        '''

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