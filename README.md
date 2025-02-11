# 배포

이 프로젝트는 아래 링크를 통해서 확인할 수 있습니다.
### 🔗 [AIMS 바로가기](https://aims-front-end-nd1k.vercel.app)

### 📌 웹페이지 확인 방법
이 프로젝트는 반응형 웹이 아니므로, **Google 개발자 도구에서 특정 화면 크기로 확인해야 합니다.**

1. **Chrome 브라우저에서 사이트 열기**
2. **개발자 도구 실행** (`F12` 또는 `Ctrl + Shift + I` / macOS: `Cmd + Option + I`)
3. **디바이스 툴바 클릭** (작은 스마트폰 아이콘 또는 `Ctrl + Shift + M`)
4. **해상도 직접 입력** → `3024 x 1964`로 설정

이제 화면이 정상적으로 보일 것입니다.

# 설치 및 실행 방법

## 1. 필수 환경 설정

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

## 2. 개발 서버 실행

개발 서버를 실행하려면 아래 명령어를 입력하세요:
```sh
yarn start
```

## 3. 빌드 (프로덕션 배포용)

프로덕션 환경을 위한 빌드를 생성하려면:
```sh
yarn build
```

## 4. 로컬에서 빌드된 페이지 실행

빌드된 프로젝트를 로컬에서 확인하려면 `serve` 패키지를 사용하세요:
```sh
npm install -g serve  # 또는 yarn global add serve
serve -s build
```
기본적으로 `http://localhost:3000/`에서 실행됩니다.

## 5. 추가 사항
- 이 프로젝트는 **React, Styled-Components, Axios** 등을 사용합니다.
- `.nvmrc` 파일을 설정하여 정확한 Node.js 버전을 유지하세요:
  ```sh
  echo "22.13.0" > .nvmrc
  ```
  이후 프로젝트 디렉터리에서 실행:
  ```sh
  nvm use
  ```
