# Setup and Run the Code
## Frontend
````bash
cd fe
npm i
npm run dev
````
http://localhost:3000
## Backend
````bash
cd be
npm i
docker compose up -d # make sure that the db is created and running
npx prisma migrate dev --name init # to apply db migration from prisma
````

# Discussion
## How and why you modeled the data structure(s) the way you did?
It was pretty straightforward; one pet can have multiple medical records so this was a 1-* relationship.
I could have created a table for the user with a 1-* relationship as well, but it requires more work for an MVP, and it
would help with implementing the auth layer. I could have also created one table for medical records that would encompass
both allergies and vaccines, but since they have different fields, it is safer and cleaner to have exclusive tables for them.

## How and why you structured your API(s)?
The APIs were structured in a way that encompass the different tables. You can get a pet by id (for the pet detail view),
delete a pet, get all pets for admin view, and get pets by owner name so that a user can only view the pets they added/own.

## How and why you decided on the page(s) you built?
The entry page is basically a text input where the owner inputs their name so that we can determine the pets they have and 
if they want to add pets. After submitting an owner name, a table renders with the pets (if any) that were added by this owner.
A user can add a pet using the Add Pet button. After adding the pet, they can press on the pet's name in the table to view 
more details like medical records and add medical records as well.
An admin can just append `/admin` to the url to view a table of all pets. They can also add records if needed by accessing the 
pet detail view by pressing on a pet's name.

## What improvements you’d make if you want to build this for real?
- Adding authentication and storing the user info in a session is an improvement over the redux store. Currently, any user can 
append a random pet id in the url and gain access to the pet information, which isn't safe. Again, with authentication
implemented, it would improve this security vulnerability. 
- Editing feature, but I felt that deleting a pet makes more sense (you can lose a pet, but it's 
rare to change your pet name or date of birth). 
- Filter feature in the table so that we can order by and filter pets based on type or medical records.
- Pagination for all tables (pet table, vaccine table, allergy table)

