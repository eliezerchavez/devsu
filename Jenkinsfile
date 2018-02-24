pipeline {
    agent any
    
    environment {
        NODE_ENV = "test"
    }
    
    stages {
        stage("Test") {
            steps {
                dir("C:\\Users\\echavez\\source\\devsu\\app") {
                    bat """
                      node -v
                      npm prune
                      npm install
                      npm test
                    """
                }
            }
        }
        
        stage('Build and Publish Docker') {
            steps {
                dir('C:\\Users\\echavez\\source\\devsu\\app') {
                    bat """
                      docker build -t eliezerchavez/devsu-hello-app .
                      docker login -u eliezerchavez -p <secret>
                      docker push eliezerchavez/devsu-hello-app:latest
                    """
                }
            }
        }
    }
    
    post {
        failure {
            // notify users when the Pipeline fails
            mail to: 'eliezer.chavez@gmail.com',
            subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
            body: "Something is wrong with ${env.BUILD_URL}"
        }
  }
}