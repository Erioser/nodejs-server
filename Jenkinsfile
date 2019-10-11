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
                    mv /home/node/public /home
                    rm -rf /home/node/*
                    mv ./* /home/node
                    rm -rf /home/node/public
                    mv /home/public /home/node
                '''
            }
        }
        stage('Deliver') { 
            steps {
                sh '''
                    cd /home/node
                    yarn
                    yarn start
                    input message: 'Finished using the web site? (Click "Proceed" to continue)'     
                    exit
                '''  
            }
        }
    }
}