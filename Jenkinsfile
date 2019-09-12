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
                    yarn

                    OLD_BUILD_ID=$BUILD_ID
                    echo $OLD_BUILD_ID
                    BUILD_ID=dontKillMe

                    yarn start

                    BUILD_ID=$OLD_BUILD_ID
                    echo $BUILD_ID
                    exit
                '''  
            }
        }
    }
}