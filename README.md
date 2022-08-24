# Made Locally
A local artisan directory.

<img width="1262" alt="Screen Shot 2022-08-23 at 7 56 11 PM" src="https://user-images.githubusercontent.com/98621663/186310446-c3844117-c346-420a-a150-46252477c4fc.png">


This non hosted project was made for my Final Project in Concordia Univeristy's Web Development Bootcamp.
It is a place where users and artisans are able to sign up and view artisan profiles via the markers on the map depending on the location.

- You will have to sign up to use the whole functionality of the website. 
- Clicking on the hamburg icon will show a dropdown which has the login/logout navigations.
- Using Auth0 you are able to signup and login securely.
- After signing up you are directed to a page to decide if you are an Artisan or not.

If you are not an Artisan:
- click no, it will bring you back to the homepage
- you have access to the map
- able to click on Artisans names on InfoWindow that sends you to artisans page
- favourite artisans, have an active list located in dropdown
- favourite events, have an active list located in dropdown

If you are an Artisan:
- click yes, brings you to a profile page template
<img width="1264" alt="Screen Shot 2022-08-23 at 7 57 58 PM" src="https://user-images.githubusercontent.com/98621663/186310714-e8d98e76-5c97-40bc-8926-e32069a1c013.png">

- fill out location if you want a marker on the map
- uses react-drag-and-drop with cloudinary to input and store images
- you have access to the map
- able to click on Artisans names on InfoWindow that sends you to artisans page
- favourite artisans, have an active list located in dropdown
- favourite events, have an active list located in dropdown
- create events
<img width="1261" alt="Screen Shot 2022-08-23 at 7 58 28 PM" src="https://user-images.githubusercontent.com/98621663/186310694-abea667f-b40d-4fb7-845b-93f8d468d0e8.png">

- add yourself to an event as a vendor, it will sohw up on the event details page and the event will show up on your profile page
- update profile in dropdown

Profiles are stored in MongoDB.

The Map is created with Google Maps API.

