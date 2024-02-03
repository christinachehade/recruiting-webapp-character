# recruiting-webapp-character
React coding test

# Create a repository from this template
- Click on `Use this template` dropdown on this repo page.
- select `Create a new repository`
- Write a name of the repo as `recruiting-webapp-character`
- Select `Public` as visibility
- Click `Create repository`

# Run the application
- Clone the newly created repo locally
- Run the following command to install node modules
```
npm i
```
- Run the following command to start web app
```
npm start
```

# Submitting your code
- Make sure your app can be set up and run via the following two commands: `npm i` and `npm start`
- Reply to the coding exercise email you received from our team with the link to this new public repository.

# Instructions

From this starting codebase, you will add a new section to the app (see requirements below). You're free to add or refactor code as you see fit so long as existing functionality remains intact.`

## What is a character sheet?

Character sheets are defined by the following high-level concepts
- Attributes: This represents a character's raw abilities 
- Attribute Modifier: calculated using the related Attribute, this value affects a character's skills
- Skills: A character's ability to perform a specific action



## Requirements

1. Add a Skill Check section for each the party. This represents the party's most well-suited character's attempt to perform an action
    - Add the following controls to the UI
      - skill: a dropdown to specify what skill we're using in the check, see `SKILL_LIST`
      - DC: An input that collects a number. The minimum value the character must meet to succeed
      - Roll: a button that will trigger the random number generation
    - Show which character was selected to attempt the action
      - this is the character with the highest total skill selected for the check
    - the character is successful if they meet or exceed the DC (see above) of the skill check. Add the total skill to a random number between 1 and 20 inclusive, if this meets or exceeds the DC the skill check is successful, otherwise it's a failure
    - When the Roll button is clicked, display the following
      - What the random number generated was
      - If the skill check is successful or a failure
      - The character selected to attempt the action
