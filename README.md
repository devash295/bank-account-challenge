# Bank Challenge

### Architecture

The architecture for the Bank Challenge project consists of a backend developed in Node.js with Express, using TypeScript, and a frontend built with React and TypeScript, utilizing MUI for styling. MongoDB with Mongoose is used for the database. Docker is employed to containerize the backend and MongoDB.

## Development

### Prerequisites

1. **[Install Docker](https://docs.docker.com/engine/install/)**
2. **[Install Node.js](https://nodejs.org/en)**
3. **[Install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)**

### Backend Development

#### Technologies

1. Node.js with Express (TypeScript)
2. MongoDB with Mongoose
3. Running the Backend with Docker
4. To run the backend using Docker, follow these steps:

#### Executing Containerized Backend

Ensure Docker is installed and running on your machine.

Navigate to the root directory of your project where the Dockerfile and docker-compose.yml are located.

Run the following command to build and start the Docker containers:

> `docker-compose up --build`

### Frontend Development

#### Technologies

1. React(Typescript)
2. MUI for styling

#### Starting Frontend

To start frontend development, run the following commands in the root directory:

> `npm install` > `npm run start`

### Setting Up Prettier

> install vscode [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

> run `npm i`

> go to vscode settings and make sure format on save is enabled

> press `ctrl+shift+p`and type in `format document with`

> select `configure default formatter`

> select `prettier - code formatter`

> now when you save the file, prettier should format it according to the [.prettierrc](./.prettierrc) file
