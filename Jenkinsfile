pipeline {
    agent {
        docker {
            image 'rtacho'
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
         stage('Test') { 
            steps {
                sh './jenkins/scripts/test.sh' 
            }
        }
    }
}