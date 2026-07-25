pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo "Getting source code..."
                checkout scm
            }
        }


        stage('Backend - User Service Test') {
            steps {
                sh '''
                cd user_service
                ./mvnw test
                '''
            }
        }


        stage('Backend - Product Service Test') {
            steps {
                sh '''
                cd product_service
                ./mvnw test
                '''
            }
        }


        stage('Backend - Gateway Service Test') {
            steps {
                sh '''
                cd gateway_service
                ./mvnw test
                '''
            }
        }


        stage('Backend - Media Service Test') {
            steps {
                sh '''
                cd media_service
                ./mvnw test
                '''
            }
        }


        stage('Frontend Install & Test') {
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
                docker compose build
                '''
            }
        }


        stage('Deploy') {
            steps {
                sh '''
                docker compose down
                docker compose up -d
                '''
            }
        }

    }


    post {

        success {
            echo "✅ Deployment successful"
        }

        failure {
            echo "❌ Pipeline failed"
        }

    }
}