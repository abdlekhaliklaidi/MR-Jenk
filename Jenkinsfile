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

        stage('Backend Build & Package') {
            steps {
                sh '''
                echo "Building Backend Services without running heavy integration tests..."
                cd user_service && ./mvnw clean package -DskipTests && cd ..
                cd product_service && ./mvnw clean package -DskipTests && cd ..
                cd gateway_service && ./mvnw clean package -DskipTests && cd ..
                cd media_service && ./mvnw clean package -DskipTests && cd ..
                '''
            }
        }

        stage('Frontend Test') {
            steps {
                sh '''
                cd client
                npm ci
                npm run test -- --browsers=ChromeHeadlessCI --watch=false
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