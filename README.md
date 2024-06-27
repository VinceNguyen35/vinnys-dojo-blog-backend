# Vinny's Dojo Blog Backend

My personal blog's backend application.

This Express application follows RESTful routing conventions for API interactions. Database schema and record queries use SQL. Infrastructure is built on AWS.

Click on the link with the CUSTOM DOMAIN NAME below to view the current working version of this project.

<a href="https://www.vinnysdojoblog.com">vinnysdojoblog.com</a>

## Table of Contents

1. [Tools Used](#tools-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Acknowledgements](#acknowledgements)

## Tools Used

<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>

For building and running the application

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>

For writing Javascript with strongly typed data

<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/>

For writing and serving API routes

<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>

For building database schema and querying data records

<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>

For hosting remote Express server and MySQL database

## Requirements

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>

Used to install and manage necessary packages and dependencies

<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white"/>

Used for its version control system for tracking changes and collaboration

<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"/>

Used as the Operating System (OS) within AWS EC2 server

## Installation

Open up a terminal and enter the following snippets of commands
```
git clone https://github.com/VinceNguyen35/vinnys-dojo-blog-backend.git
npm install
npm run build
npm run serve
```

## Usage

The default port for the backend is 3000. API calls can be reached using the following:

http://localhost:3000/api/blogs

Specific API routes can be found within "src/routes/blogRoutes.ts"

If the local development server does not work, environment variables are most likely missing.  Fortunately, you can access the remote server and make API calls using the following AWS API Gateway URL:

https://wfywh0o582.execute-api.us-west-1.amazonaws.com/api/blogs

## Acknowledgements

This project is inspired by my appreciation for creative writing and for all the time I have spent reading on Reddit
