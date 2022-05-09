// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const {generateMarkdown, writeToFile} = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the project title? (Required)",
        validate: input => {
            if(input){
                return true;
            }else{
                console.log('Please enter the project title.');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "description",
        message: "Enter project description here (Required): ",
        validate: input => {
            if(input){
                return true;
            }else{
                console.log('Please enter the project description.');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "install",
        message: "Enter installation instructions here: "
    },
    {
        type: "input",
        name: "usage",
        message: "Enter usage information here: "
    },
    {
        type: "input",
        name: "contribution",
        message: "Enter contribution guidelines here: "
    },
    {
        type: "input",
        name: "test",
        message: "Enter test instructions here: "
    }
];

// TODO: Create a function to initialize app
const init = () => {
    return inquirer.prompt(questions);
};

// Function call to initialize app
init()
    .then(userInput => generateMarkdown(userInput))
    .then(markdown => writeToFile(markdown))
    .then(successMessage => console.log(successMessage.message))
    .catch(err => console.log(err));
