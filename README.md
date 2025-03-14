# Express Test Project

### This repository is for educational purposes for my participants within [Jobloop AS](https://www.jobloop.no/)

#### Backend uses an Express/Node.js with Sequelize to handle database communication and an MSSQL database for all storage

#### Frontend uses Vite with React to render the webpages

## Installation

Download or git copy the project then

```bash
  npm i
  npm run install:all
```

open a database in MSSQL and paste the script in to create the table. Create a user that can access this data and put DB related variables in backend/.env

then

```bash
    npm run dev:all
```
