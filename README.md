# Getting Started

This project was developed and tested on the following operating systems:

## 1. Install Requirements

To run this project, you'll need Node.js installed on your system. We recommend using **NVM (Node Version Manager)** to manage your Node.js versions.

### Install NVM and Set Node.js Version
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc  # Use source ~/.zshrc if using zsh
nvm install 22.13.0
nvm use 22.13.0
nvm alias default 22.13.0
```

### Install Yarn (if not installed)
```sh
npm install -g yarn
```

### Clone the Repository and Install Dependencies
```sh
git clone https://github.com/mongsam2/AIMS-Front-End.git
cd AIMS-Front-End
yarn install
```

## 2. Developing

To start the development server, run:
```sh
yarn start
```

## 3. Building

To create a production build, use:
```sh
yarn build
```

## 4. Running the Build Locally

If you want to preview the production build locally, you can use `serve`:
```sh
npm install -g serve  # or yarn global add serve
serve -s build
```
By default, this will start a server at `http://localhost:3000/`.

## 5. Additional Notes
- This project uses **React, Styled-Components, Axios**, and other dependencies for the frontend.
- Make sure to have the correct **Node.js version** by using `.nvmrc` in the project directory:
  ```sh
  echo "22.13.0" > .nvmrc
  ```
  Then, inside the project directory, run:
  ```sh
  nvm use
  ```

