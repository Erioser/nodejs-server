pipeline {
    agent any
    environment { 
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    docker stop node-server
                    docker rm node-server
                    docker run -d -ti  -p 3000:3000 --name node-server -v ~/node:/workspace node:10.16.3-alpine
                    rm -rf /home/node/*
                    mv ./* /home/node
                '''
            }
        }
        stage('Deliver') { 
            steps {
                sh '''
                    cd /home/node
                    npm install yarn -g
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