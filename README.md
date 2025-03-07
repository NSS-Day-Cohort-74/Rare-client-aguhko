# Rare: The Publishing Platform for the Discerning Writer

## Getting Started
1. Install dependencies: `npm install`
2. Run the code `npm start`
<!-- TODO: Update the remaining steps if anything changes -->
3. With the server also running, check that the login, register, and logout functionality is in working.
4. This template is using [Bulma](https://bulma.io/documentation) for styling. Take a little bit of time to familiarize yourself with the framework if you would like to continue using it.


<!-- TODO: Finish writing the readme -->
**Here are the developed views for Rare Publishing.**

# All Posts

This component is a list that displays all of the created posts that all users have made. This is the hub-center of the web application.
![image](https://github.com/user-attachments/assets/6d1b1b5c-45d7-4af6-a004-881fc8b95930)

## My Posts

This component is also a list of posts. However, it will only display the posts that you, the user, have created. You will not be able to see others' posts in this view except your own. 
![image](https://github.com/user-attachments/assets/ff2a1c47-b522-4c93-a412-fa00dc817c35)

## New Post

This is where our users will be able to being publishing their own original content. It is a form that receives user data and submits that data to the server's database. This is how the lists are initially created, and extended.
![image](https://github.com/user-attachments/assets/16d729b7-5bd1-4882-a946-914116dd2626)
(Note: The fields "Title", and "Content" are required. An image's url is not necessary for submitting a post).

## Tag Management

This component is a list of available tags that a user may append to their post. (Though the functionality has not yet been created for this.) At the moment, new tags can be created here. 
![image](https://github.com/user-attachments/assets/780011c9-34bb-4d54-9881-c2251354b797)


## Category Management

Category management is very similar to tags, in that, it lists the available categories that our users may select from to make their posts more relevant to other users. Categories are supported in this version and can be used to filter posts in the All Posts view. You can also create your own. Enter the name of the category that better suits your post for easier look-up later! 
![image](https://github.com/user-attachments/assets/36081718-11ec-47d7-8650-03a21a7af2c9)

