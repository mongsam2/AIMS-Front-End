# AIMS-Front-End


## 1. 페이지 구성
| 로그인 페이지 | 메뉴 선택 페이지 | 
|----------|----------|
| <img src="https://github.com/user-attachments/assets/5ae31df8-5c40-433a-954e-77e5b68fc831" width="600"> | <img src="https://github.com/user-attachments/assets/699b75bd-11f9-4b5d-a0f8-e94048d433f0" width="600"> 

| 어드민 - 파일 업로드 페이지 | 입학 서류 검토 페이지 | 
|----------|----------|
| <img src="https://github.com/user-attachments/assets/848fd32d-4528-4599-aa17-deb60eddb3f0" width="500">  | <img src="https://github.com/user-attachments/assets/9a63e85d-6bb2-409e-b4bd-4aa3edbf6ff4" width="500">

| 분류 실패 팝업 창 | 서류 팝업 창 | 
|----------|----------|
| <img src="https://github.com/user-attachments/assets/ff4866f2-119d-492c-a8d4-7786e06b4473" width="500"> | <img src="https://github.com/user-attachments/assets/496719f9-2d04-4899-8b24-7d39827e6d72" width="500"> 

| 생활기록부 및 면접 평가 페이지 | 논술 평가 페이지 | 
|----------|----------|
| <img src="https://github.com/user-attachments/assets/66cff702-0ac8-4763-bb74-714910672193" width="500"> | <img src="https://github.com/user-attachments/assets/dc727fe2-0da7-4f1d-9ac3-81bfff7e82f9" width="500"> 

&nbsp;
## 2. 기술 스택
<img src="https://img.shields.io/badge/react-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" /> &nbsp;  <img src="https://img.shields.io/badge/javascript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" />

  <img src="https://img.shields.io/badge/yarn-2C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white" /> &nbsp; <img src="https://img.shields.io/badge/axios-5A29E4.svg?style=for-the-badge&logo=axios&logoColor=white" />  &nbsp; <img src="https://img.shields.io/badge/vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />


 &nbsp;
## 3. 설치 및 실행 방법

### 1. 필수 환경 설정

이 프로젝트를 실행하려면 **Node.js**가 필요합니다. Node.js 버전 관리를 위해 **NVM (Node Version Manager)** 사용을 권장합니다.

### NVM 설치 및 Node.js 버전 설정
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc  # zsh 사용 시 source ~/.zshrc
nvm install 22.13.0
nvm use 22.13.0
nvm alias default 22.13.0
```

### Yarn 설치 (미설치 시)
```sh
npm install -g yarn
```

### 프로젝트 클론 및 의존성 설치
```sh
git clone https://github.com/mongsam2/AIMS-Front-End.git
cd AIMS-Front-End
yarn install
```

### 2. 개발 서버 실행

개발 서버를 실행하려면 아래 명령어를 입력하세요:
```sh
yarn start
```

### 3. 빌드 (프로덕션 배포용)

프로덕션 환경을 위한 빌드를 생성하려면:
```sh
yarn build
```

### 4. 로컬에서 빌드된 페이지 실행

빌드된 프로젝트를 로컬에서 확인하려면 `serve` 패키지를 사용하세요:
```sh
npm install -g serve  # 또는 yarn global add serve
serve -s build
```
기본적으로 `http://localhost:3000/`에서 실행됩니다.
 &nbsp;
### 5. 추가 사항
- 이 프로젝트는 **React, Styled-Components, Axios** 등을 사용합니다.
- `.nvmrc` 파일을 설정하여 정확한 Node.js 버전을 유지하세요:
  ```sh
  echo "22.13.0" > .nvmrc
  ```
  이후 프로젝트 디렉터리에서 실행:
  ```sh
  nvm use
  ```
