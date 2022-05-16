const inquirer = require('inquirer');
const {generateMarkdown, writeToFile} = require('./utils/generateMarkdown.js');

//An array of questions to gather user input
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
        type: "list",
        name: "license",
        message: "Select license type: ",
        choices: [
          'None',
          'Apache License 2.0',
          'GNU General Public License v3.0',
          'MIT License',
          'BSD 2-Clause "Simplified" License',
          'BSD 3-Clause "New" or "Revised" License',
          'Boost Software License 1.0',
          'Creative Commons Zero v1.0 Universal',
          'Eclipse Public License 2.0',
          'GNU Affero General Public License v3.0',
          'GNU General Public License v2.0',
          'GNU Lesser General Public License v2.1',
          'Mozilla Public License 2.0',
          'The Unlicense'
        ],
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
    },
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
    }
];

//Function to initialized app
const init = () => {
    console.log(`
    ======================
       README GENERATOR
    ======================
    Please answer the following questions to generate a README file.

    NOTE: If prompted for a section that is not desired, simply hit
    "Enter".
    `)
    return inquirer.prompt(questions);
};

// Function call to initialize app
init()
    .then(userInput => generateMarkdown(userInput))
    .then(markdown => writeToFile(markdown))
    .then(successMessage => console.log(successMessage.message))
    .catch(err => console.log(err));
