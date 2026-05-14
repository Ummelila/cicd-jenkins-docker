pipeline{
    agent any

    environment{
        CONTAINER_NAME = "three-tier-app"
        MYSQL_CONTAINER = "mysql-container"
        IMAGE_NAME = "three-tier-image"
        EMAIL = "ummelila01@gmail.com"
        PORT = "5000"
    }
    stages{
        stage('Clone Repo'){
            steps{ 
                git branch: 'main', url: 'https://github.com/Ummelila/cicd-jenkins-docker.git'
            }
        }
        stage('Start MySQL'){
            steps{
                sh '''
                    docker start ${MYSQL_CONTAINER} || docker run -d --name ${MYSQL_CONTAINER} \
                    -e MYSQL_ROOT_PASSWORD=root \
                    -e MYSQL_DATABASE=formdb \
                    -p 3306:3306 mysql:8
                '''
            }
        }
        stage('Install Backend Dependencies'){
            steps{
                sh '''
                    cd ${WORKSPACE}/three-tier-app/backend
                    npm install
                '''
            }
        }
        stage('Create ENV File'){
            steps{
                sh '''
                    echo "DB_HOST=127.0.0.1" > three-tier-app/backend/.env
                    echo "DB_USER=root" >> three-tier-app/backend/.env
                    echo "DB_PASS=root" >> three-tier-app/backend/.env
                    echo "DB_NAME=formdb" >> three-tier-app/backend/.env
                '''
            }
        }
        stage('Stop Previous App'){
            steps{
                sh '''
                    pkill -f "node three-tier-app/backend/index.js" || true
                '''
            }
        }
        stage('Start App'){
            steps{
                sh '''
                    nohup node three-tier-app/backend/index.js &
                '''
            }
        }
        stage('Send Email Notification'){
            steps{
                script{
                    emailext(
                        subject: 'Three Tier App Deployed Successfully on EC2',
                        body: "Your Three Tier App is deployed!\nhttp://54.172.235.182:${PORT}/",
                        to: "${EMAIL}"
                    )
                }
            }
        }
    }
    post {
        failure {
            script{
                emailext(
                    subject: 'BUILD FAILED-Three Tier App',
                    body: 'Jenkins build failed. Please check the logs.',
                    to: 'ummelila01@gmail.com'
                )
            }
        }
    }
}