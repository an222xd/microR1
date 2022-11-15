pipeline {
    agent {
        docker {
            image 'quizzical_cannon' 
            args '' 
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