### 🏙️ Mission Statement

Purrfect Companions aims to provide an immersive pet simulation experience that allows players to forge connections with virtual animal companions. Our game strives to create a captivating virtual world where players can care for, nurture, and engage with their digital pets, fostering a sense of companionship, responsibility, and joy.
___

### 🚀 Why I Built This 

The inspiration behind creating this game is rooted in the joy and comfort it has consistently brought me, reminiscent of the solace I found in it during my childhood. I am motivated by the desire to share this source of comfort and happiness with others.
___


### 📝 Features & User Stories

User signs up
User chooses pet species, give it a name
Backend stores the pet. Pet states begin with default values (e.g. happiness=50, cleanliness=50, Energy=50, hunger=50)
User sees their pet in the screen with background and action buttons (eat, sleep, play, bathe) on the bottom and status bars showing the four states
When the user presses an action button, the state changes:
Feed: ++happiness, -cleanliness, +energy, -hunger
Bathe: -happiness, ++cleanliness
Play: ++happiness, --cleanliness, -energy, +hunger
Sleep: +energy, +happiness
As the user takes actions, the status bar shows the updated state
___


### 📚 Tech Stack: 

I intend on using React for the front end, Node.js and Express for the backend, and PostgreSQL for the database and javascript.
___

### 🗓️ Milestones and Timeline: 


*Example:* 
* By August 12: ERD and Wireframe 
* By August 16 : Pet objects and action buttons are completed 
___


