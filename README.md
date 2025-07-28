## 📌 Project Title: `DevOps-Driven Portfolio 🚀`

> A blazing-fast, fully Dockerized portfolio project using **Vite**, **React**, **Tailwind CSS**, and **GitHub Actions** for CI/CD. Deployed effortlessly via DockerHub!

---

## 🧠 Table of Contents

1. [About the Project](#-about-the-project)
2. [Tech Stack](#-tech-stack)
3. [Features](#-features)
4. [Folder Structure](#-folder-structure)
5. [CI/CD Pipeline](#-cicd-pipeline)
6. [Jenkins Alternative ](#-jenkins-alternative)
7. [Setup & Run Locally](#-setup--run-locally)
8. [Dockerhub Deployment](#-dockerhub-deployment)
9. [Screenshots](#-screenshots)
10. [Security Considerations](#-security-considerations)
11. [License](#-license)

---

## 💾 About the Project

This is a **fun and dynamic developer portfolio** that showcases my DevOps knowledge alongside my technical projects. It fetches GitHub repos dynamically using keywords like `"portfolio"` or `"devops"` and visualizes them beautifully.

Key design goals:

* ⚡ Ultra-lightweight frontend using `Vite`
* 🎨 Fully customizable via Tailwind CSS
* 📦 Docker-ready for shipping anywhere
* ↻ Auto-build and deploy with GitHub Actions
* 🛠️ Jenkins-based alternative CI/CD

---

## ⚙️ Tech Stack

| Frontend | CI/CD                    | Deployment | DevOps Tools                   |
| -------- | ------------------------ | ---------- | ------------------------------ |
| React    | GitHub Actions / Jenkins | DockerHub  | Docker, GitHub Secrets, Buildx |

---

## ✨ Features

* Responsive and modern UI.
* Pulls latest GitHub repos filtered by keywords or topics.
* Displays preview images from the README.
* Built with DevOps automation in mind.

---

## 📁 Folder Structure (minimal)

```
portfolio-devops/
├── public/
├── src/
│   ├── components/
│   ├── githubAPI.js
├── .github/workflows/
│   └── docker.yml
├── Dockerfile
├── README.md
```

---

## 🔄 CI/CD Pipeline

### ✅ Using GitHub Actions

* Triggers on every `push` to `main`
* Builds Docker image using `Docker Buildx`
* Pushes image to DockerHub (public)
* Uses encrypted GitHub Secrets for security

📂 Path: `.github/workflows/docker.yml`

### 🧪 Test it locally

```bash
docker pull rahulpatil414/portfolio-site:latest
docker run -p 3000:80 -d rahulpatil414/portfolio-site
```

---

## 🔁 Jenkins Alternative 

> Here's the approach if I have choosed Jenkins over Github Actions:

### 🧹 Jenkins Job Type

* Use **Multibranch Pipeline** or **Declarative Pipeline** with a `Jenkinsfile`. But we can use **Single Branch** pipeline as well for small project like this.

### 💾 Sample `Jenkinsfile`

```groovy
pipeline {
  agent any

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/Rahul-Patil123/portfolio-devops.git'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t rahulpatil414/portfolio-site .'
      }
    }
    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
          sh 'docker push rahulpatil414/portfolio-site'
        }
      }
    }
  }
}
```

---

## 🛠️ Setup & Run Locally

```bash
git clone https://github.com/Rahul-Patil123/portfolio-devops.git
cd portfolio-devops
npm install
npm run dev
```

---

## 🐳 DockerHub Deployment

1. Build locally:

   ```bash
   docker build -t rahulpatil414/portfolio-site .
   ```

2. Run:

   ```bash
   docker run -p 3000:80 rahulpatil414/portfolio-site
   ```

3. Push:

   ```bash
   docker push rahulpatil414/portfolio-site
   ```

✅ Now accessible at `http://localhost:3000`

---

## 🖼️ Screenshots

```md
![Preview](/public/preview.png)
![StartingAnimation](/public/image-1.png)
![LandingPage](/public/image.png)
![DockerHub](/public/image-2.png)
![DockerHub-Tag-1.0](/public/image-3.png)
```
---

## 🔐 Security Considerations

* GitHub Secrets are encrypted and safe **if anyone don’t log or expose them in builds**.
* Used `.dockerignore` to exclude:

  ```
  node_modules
  dist
  .git
  .vite
  Dockerfile
  .dockerignore
  *.log
  .vscode
  .DS_Store
  .env.local
  .github/
  ```
* On Jenkins, we can use `Credentials Manager` to securely inject DockerHub credentials.

---

## 📜 License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
