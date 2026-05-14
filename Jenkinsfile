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
                    npm install --no-fund --no-audit
                '''
            }
        }
        stage('Create ENV File'){
            steps{
                sh '''
                    echo "DB_HOST=127.0.0.1" > ${WORKSPACE}/three-tier-app/backend/.env
                    echo "DB_USER=root" >> ${WORKSPACE}/three-tier-app/backend/.env
                    echo "DB_PASS=root" >> ${WORKSPACE}/three-tier-app/backend/.env
                    echo "DB_NAME=formdb" >> ${WORKSPACE}/three-tier-app/backend/.env
                '''
            }
        }
        stage('Stop Previous App'){
            steps{
                sh '''
                    pm2 delete three-tier-app || true
                    sleep 2
                '''
            }
        }
        stage('Start App'){
            steps{
                sh '''
                    pm2 start ${WORKSPACE}/three-tier-app/backend/index.js --name three-tier-app
                    sleep 3
                    echo "App started!"
                '''
            }
        }
        stage('Send Email Notification'){
            steps{
                script{
                    emailext(
                        subject: 'Three Tier App Deployed Successfully on EC2',
                        body: "Your Three tier App is deployed!\nhttp://107.22.98.47:${PORT}/",
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
                    subject: 'BUILD FAILED -Three Tier App',
                    body: 'Jenkins build failed. Please check the logs.',
                    to: 'ummelila01@gmail.com'
                )
            }
        }
    }
}