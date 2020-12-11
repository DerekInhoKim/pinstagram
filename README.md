**Developer** Derek Kim

**Description**
* Pixelgram is a web application where users are free to create posts which are drawn by a user using a javascript canvas.
The canvas is configured to be a 32 x 32 blocks which act as pixels, to reinforce the pixel art style of drawing.
These user created pixel drawings will be saved and hosted to AWS S3 using Boto3.
Users will be able to like and comment on another user's posts, as well as follow other users to get the newest pictures uploaded by the users they follow.

**MVP**
* User profile and authentication (CRUD)
* Allow users to create a post (CRUD)
* The ability for users to create their own drawings to be posted to the website
* Allow users to like/comment on a post (CRUD)
* Allow users to follow other users to recieve updates on their homepage with the latest pictures
* Discovery page, for user's to see posts from users that they don't currently follow
* Bookmarks for users to easily track of posts they like

**Stretch Goals**
* Allow users to search for other posts using hashtags
* Allow users to post a story to their account, non-drawing related photo uploads which will persist for 24 hours.
* Dark Mode to change the color scheme.
* Mobile Friendly
* Display Edited status next to posts/comments that have been edited.
* Comment likes
* Notifications
* Discovery page for users to find posts from users that they don't currently follow

## Technologies
 - JavaScript
 - Python 3
 - PostgreSQL
 - Psycopg2
 - Flask
 - FlaskForms
 - SQLAlchemy
 - Alembic
 - React
 - HTML/CSS
 - Boto 3

 ## Feature List
 ### User CRUD
  - Signup/login/logout
  - User profile (User's profile page, displays all a User's posts, User's description/profile picture, User edit form)

 ### Post CRUD
  - Users can create/edit/delete a post
  - A Post will contain a user drawn image as it's image source, a caption, posted date/time.
  - A Post will have likes associated with them.
  - A Post will also have comments assocaited with them.

 ### Comments CRUD
  - Users will have the ability to leave comments on posts
  - Comments will have the ability to be updated.

 ### Likes
  - Users will have the ability to like a post, this will be reflected on the post.

 ### Followers
  - Users will have the ability to follow other users to recieve updates on a User's homepage.

 ### Database Schema
  ![Pixelgram Database Schema](/assets/PixelgramDBSchema.png)
 ### Wireframes
  - Home Page
   - Link: https://wireframe.cc/UO0GxO
  - User Page
   - Link: https://wireframe.cc/Dom4cN
  - Post Page
   - Link: https://wireframe.cc/5uUKC7
