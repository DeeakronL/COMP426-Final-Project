# COMP426-Final-Project

This project was a collaboration between Luke and Matthew Wheeler for the final project for our Comp 426 Modern Web Programming class.
Luke did more of the frontend and Matthew did more of the backend, but neither one did solely their respective side.

In short, this project is a Shooting Gallery game, where players shoot targets by clicking on them. They are rewarded for accuracy and speed with score.
There are three different modes: Shoot 'em up, where players just shoot targets in a timeframe, and more appear after old ones are destroyed; Shoot 'em careful, where there are "bad" targets that subtract from you score if you shoot them; and Shoot 'em quick, which is a quickdraw mode.

Players are able to create an account where their scores are saved and put on a leaderboard. Due to it being a quick demo project, the username and password are not encrypted as this isn't intended to store any sensitive information, and says as much. The information is sent to and from the server via a REST API, checking to make sure the username and password match the account in the server's data, as well as pulling up stats from accounts for the leaderboard.
