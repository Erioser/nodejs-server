pipeline {
    agent {
        docker {
            image 'node:10.16.3-alpine'
            args '-p 3000:3000'
        }
    }
    environment { 
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    rm -rf /home/node/*
                    mv ./* /home/node
                '''
            }
        }
        stage('Deliver') { 
            steps {
                sh '''
                    cd /home/node
                    yarn global add forever 
                    yarn
                    forever stopall
                    forever start app.js
                    exit
                '''  
            }
        }
    }
}