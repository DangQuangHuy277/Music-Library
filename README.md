# Music-Library

# Database diagram

<img width="510" alt="image" src="https://github.com/DangQuangHuy277/Music-Library/assets/62865419/c0a0e91f-0078-4d1f-aa11-d82513b78fee">


First change directory to server by ```cd server``` then

# Install nessessory dependency, package
(If yarn is not installed then install using ```npm install --global yarn```)
- Install package for frontend
```cd frontend```
```yarn install```

# Set up database
Enable postgreSQL extension to auto generate id 
(Run this command by psql of postgreSQL to add extension to postgreSQL to use auto generate uuid):
```CREATE EXTENSION IF NOT EXISTS "uuid-ossp";```

Run sql file ```database.sql``` in resource folder to set up database table

Run sql file ```data.sql``` to add test account
- email: admin1@gmail.com with password: 123456
- email: user1@gmail.com with password: 123456


# API
## Authentication API
Note that authentication API is have format: `/api/v1/auth/${endpoint}`
| Method | Endpoint | Description |
| ------ | ---------| ----------- |
| POST | /register | Post email, username, password, role to register account |
| POST | /authenticate | Post email and password to get a access Token |


## Resource API

Note that all API URL have format: `/api/v1/${endpoint}`

| Method | Endpoint | Description |
| ------ | ---------| ----------- |
| GET | /songs | Returns a list of all songs |
| POST | /songs | Creates a new song |
| GET | /songs/\:id | Returns a specific song by ID|
| PATCH | /songs/\:id | Updates a specific song by ID|
| DELETE | /songs/\:id | Deletes a specific song by ID|
| GET | /albums | Returns a list of all albums |
| POST | /albums | Creates a new album |
| GET | /albums/\:id | Returns a specific album by ID |
| PATCH | /albums/\:id | Updates a specific album by ID |
| DELETE | /albums/\:id | Deletes a specific album by ID |
| GET | /artists | Returns a list of all artists |
| POST | /artists | Creates a new artist |
| GET | /artists/\:id | Returns a specific artist by ID |
| PATCH | /artists/\:id | Updates a specific artist by ID |
| DELETE | /artists/\:id | Deletes a specific artist by ID |
| GET | /artists/\:id/albums | Return list album of a specific artist |
| GET | /artists/\:id/songs | Return list songs of a specific artist |
| GET | /albums/\:id/songs | Return list songs of a specific album |
| GET | /songs/\:id/artist | Return list songs of a specific artist |

# Test in localhost
Run frontend: ```cd frontend``` then run ```yarn dev```

Run backend: ```cd backend``` then run ```./mvnw spring-boot:run```



