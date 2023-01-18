# Social Network API

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Description 

This is a social networking API where users can post about their thoughts and react to other people's thoughts. Users can also "follow" other users on this application. The API functions on MongoDB, Mongoose, and NodeJS (express).

## Table of Contents 

* [Installation](#installation) 

* [Usage](#Usage) 

* [License](#license) 

* [Contribution](#contribution) 

* [Questions](#questions) 

## Installation 

1. Clone the git repsitory.
2. run ```npm i``` in terminal to install the necessary node modules.

## Usage 

Link to the demonstration video: https://drive.google.com/file/d/1Xluy8lL-oEMVByXJV2m8JDyTqaZrz-rV/view 

Users can use CRUD methods on different routes to achieve the results they desire.

1. /api/users
    - this route allows GET and POST requests to display all users and to create a user. 
    - username and email are required fields for creating a user.
2. /api/users/:id
    - this route allows GET, PUT and DELETE requests.
    - GET requests would retrive the user with the given id.
    - PUT requests updates the user with the given id.
    - DELETE deletes the user with the given id.
    - **deleting a user will also remove all thoughts the user owns, and the user will be removed from all friend lists**
3. /api/users/:userId/friends/:friendId
    - this route allows POST and DELETE request which adds and removes a friends from a user's friend list
4. /api/thoughts
    - this route allows GET and POST methods that retrives all thought and creates a thought. 
    - thoughtText, username, and userId are required fields to create a thought.
5. /api/thoughts/:id
    - this route allows GET, POST, and DELETE requests and works similarly as the /users/:id route.
6. /api/thoughts/:thoughtId/reactions
    - only has POST routed and adds a reaction to the thought with the given ID. username and reactionBody are required fields. 
7. /api/thoughts/:thoughtId/reactions/:reactionId
    - only has DELETE routed and removes a reaction from the given thought.

## License 

GNU General Public License v3.0

## Contribution

If you would like to contribute to this application, please reach out to the owner via email first. You can find the owner's email listed under the 'Questions' section below.  

## Questions 
If you have any questions about the repo, open an issue or contact me directly at stephanietseng113@gmail.com. 
You can find more of my work at [wytseng](https://github.com/wytseng).
