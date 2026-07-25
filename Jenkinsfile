pipeline {

    agent any


    environment {
        COMPOSE_FILE = "docker-compose.yml"
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
                    steps {
                        sh '''
                        cd user_service
                        ./mvnw test
                        '''
                    }
                }


                stage('Product Service') {
                    steps {
                        sh '''
                        cd product_service
                        ./mvnw test
                        '''
                    }
                }


                stage('Gateway Service') {
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
                docker compose build
                '''

            }

        }



        stage('Deploy') {

            steps {

                sh '''
                docker compose up -d
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