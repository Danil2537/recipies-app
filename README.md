In order to successfully run the application, you need to have npm and node.js installed on your machine. 

Open a folder you want the app to be in, and in vs code (or other) terminal execute the following commands: 

git clone https://github.com/Danil2537/recipies-app.git

cd recipies-app

cd backend


Add a .env file to the backend folder
In that file, write a port you want the server to run in:
PORT=[YOUR_PORT]

Then, run commands: 

npm install

npm run dev


Leave this terminal open, and open another terminal, where you should do the following:

cd frontend

In the frontend folder, add a .env.local file. Inside that file, write which port your server is on, like this:
NEXT_PUBLIC_API_PORT=[YOUR_PORT]

Then, run commands:
npm install

npm run dev


Now, you should be able to open the app on the http://localhost:3000/



In the app, you will see a list of dishes, and two input fields: Filter type and Query.
To see the details for one of the listed dishes, simple click on it.
To filter dishes, choose the type of filter you want: country, ingredient or category, enter the query you want to find and press "Apply Fiilter" button.

On the page for individual dish, you will see several text highlighted in blue.
Those are clickable links, that will take you to the list page, automatically applying appropriate filter.
For example, the Migas dish is Spanish, so if you click on the word "Spanish" on it's page, you would be redirected to the list of other spanish dishes.
