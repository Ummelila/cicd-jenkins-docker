<<<<<<< HEAD
pipeline {
    agent any

    environment {
        CONTAINER_NAME = "nestjs-app"
        IMAGE_NAME = "nesths-image"
        EMAIL = "ummelila01@gmail.com"
        PORT = "3000"
    }

    stages {
        stage('Clone Repo'){
            steps{
                git branch: 'main', url: 'https://github.com/Ummelila/cicd-jenkins-docker.git'
                
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Stop & Remove Previous Container') {
            steps {
                sh '''
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                '''
            }
        }
        stage('Docker Container Run') {
            steps {
                sh '''
                    docker run -d -p ${PORT}:${PORT} --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
        stage('Send Email Notification') {
            steps {
               emailext(
                subject: "NestJS App Deployed Successfully on EC2!",
                body: "Your Nest JS app is Deployed! http://http://18.215.235.95/:${PORT}/",
                to: "${EMAIL}"
               )
            }
        }

=======
pipeline{
    agent any

    environment{
        CONTAINER_NAME = "nestjs-app"
        IMAGE_NAME = "nestjs-image"
        EMAIL = "ummelila01@gmail.com"
        PORT = "3000"
    }
    stages{
        stage('Clone Repo'){
            steps{ 
                git branch: 'main', url: 'https://github.com/Ummelila/cicd-jenkins-docker.git'
            }
        }
        stage('Build Docker Image'){
            steps{
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }
        stage('Stop and Remove Previous Container'){
            steps{
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }
        stage('Docker Container Run'){
            steps{
                sh "docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}"
            }
        }
        stage('Send Email Notification'){
            steps{
                script{
                    emailext(
                        subject: 'NEST JS App Deployed Successfully on EC2',
                        body: "Your NEST JS app is deployed!\nhttp://54.204.159.143:${PORT}/",
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
                    subject: 'BUILD FAILED - NEST JS App',
                    body: 'Jenkins build failed. Please check the logs.',
                    to: 'ummelila01@gmail.com'
                )
            }
        }
>>>>>>> 51e75ef5f5a1f48bb8cd816c9ed81ac5c0c57157
    }
}