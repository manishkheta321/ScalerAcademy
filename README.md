# Interview Scheduling Application

An Application to assist Scheduling and Managing Interviews.

# Technologies Used

- Node.JS
- Express.JS
- ReactJS
- MySQL

# Local Setup

- Clone the repository
- Install Node JS
- Setup MySQL server and update config file in Config folder
- Run the following command to Create MySQL table

```
CREATE TABLE `interviews` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `Interviewer` varchar(50) NOT NULL,
  `Interviewee` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```

- Run the following commands in project directory to start the Server

```
npm install
npm start
```

- Open another terminal to run the Client

```
cd client
npm install
npm start
```

# Tasks Accomplished

- Scheduling a New Interview is as simple as few clicks
- No Participant have an Overlapping Interview
- Made application Mobile friendly
- Check for Time entered are valid
- Usage of Industry level Technology Stack
- Usage of REST full web services
- CURD Based Application
- Followed MVC Software design pattern
- Usage of GET, POST, PUT and DELETE
- Every page is a SPA
