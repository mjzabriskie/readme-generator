// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const {generateMarkdown, writeToFile} = require('./utils/generateMarkdown.js');

const testDataObj = {
    github: 'mjzabriskie',
    email: 'zabriskie.m@gmail.com',
    title: 'README Generator',
    description: 'This is a CLI application meant to dynamically generate a README file based on user input.',
    install: 'Fork repository on Git and run in VS Code.',
    usage: 'Personal use only',
    contribution: "Feel free to create a pull request on a forked repo, I'll review it when I have time.",
    test: 'This section is a mystery to me *TEST*'
  }

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username? (Required)",
        validate: input => {
            if(input){
                return true;
            }else{
                console.log('Please enter your GitHub username.');
                return false;
            }
        }
    },
    {
        type: "input",
        name: "email",
        message: "What is your email? (Required)",
        validate: input => {
            if(input){
                return true;
            }else{
                console.log('Please enter your email.');
                return false;
            }
        }
    },
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
    console.log(`
    ======================
       README GENERATOR
    ======================
    Please answer the following questions to generate a README file.
    `)
    return inquirer.prompt(questions);
};

// Function call to initialize app
init()
    .then(userInput => generateMarkdown(userInput))
    .then(markdown => writeToFile(markdown))
    .then(successMessage => console.log(successMessage.message))
    .catch(err => console.log(err));
