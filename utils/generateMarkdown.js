const fs = require("fs");
//initializing array to hold sections that have input
const sections = [];

const writeToFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/README.md", fileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "File created in dist folder.",
      });
    });
  });
};

// If there is no license, return an empty string, otherwise return badge and link
function renderLicenseBadge(license) {
  if (!license || license === "None") {
    return "";
  }
  if (license === "Apache License 2.0") {
    return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
  }
  if (license === "GNU General Public License v3.0") {
    return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
  }
  if (license === "MIT License") {
    return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
  }
  if (license === 'BSD 2-Clause "Simplified" License') {
    return `[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`;
  }
  if (license === 'BSD 3-Clause "New" or "Revised" License') {
    return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
  }
  if (license === "Boost Software License 1.0") {
    return `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
  }
  if (license === "Creative Commons Zero v1.0 Universal") {
    return `[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)`;
  }
  if (license === "Eclipse Public License 2.0") {
    return `[![License](https://img.shields.io/badge/License-EPL_2.0-red.svg)](https://opensource.org/licenses/EPL-2.0)`;
  }
  if (license === "GNU Affero General Public License v3.0") {
    return `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`;
  }
  if (license === "GNU General Public License v2.0") {
    return `[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`;
  }
  if (license === "GNU Lesser General Public License v2.1") {
    return `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)`;
  }
  if (license === "Mozilla Public License 2.0") {
    return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
  }
  if (license === "The Unlicense") {
    return `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;
  }
}

/*The following "render" functions return their namesake sections
if a value is present.*/
const renderInstallSection = installPresent => {
  if (installPresent) {
    sections.push("## Installation" + "\n" + installPresent);
    return true;
  }
};

const renderUsageSection = usagePresent => {
  if (usagePresent) {
    sections.push("## Usage" + "\n" + usagePresent);
    return true;
  }
};

const renderLicenseSection = licensePresent => {
  if (licensePresent && licensePresent !== "None") {
    sections.push("## License" + "\n" + "This application is covered under a(n) " + licensePresent + " license.");
    return true;
  }
};

const renderContributionSection = contributionPresent => {
  if (contributionPresent) {
    sections.push("## Contributing" + "\n" + contributionPresent);
    return true;
  }
};

const renderTestSection = testPresent => {
  if (testPresent) {
    sections.push("## Tests" + "\n" + testPresent);
    return true;
  }
};

/* NOTE: dynamicTableOfContents, which calls the function to render each section,
is called before dynamicSections, and therefore populates the sections array  */
const dynamicSections = () => {
  let finalSecStr = "";

  sections.forEach(section => {
    finalSecStr = finalSecStr + "\n" + section + "\n";
  });

  return finalSecStr;
}

//Checks each section to see if it should be added to table of contents
const dynamicTableOfContents = sectionCheck => {
  let installation = renderInstallSection(sectionCheck.install);
  let usage = renderUsageSection(sectionCheck.usage);
  let license = renderLicenseSection(sectionCheck.license);
  let contribution = renderContributionSection(sectionCheck.contribution);
  let test = renderTestSection(sectionCheck.test);
  let questions = "[Questions](#questions)";
  let finalTocStr = "";
  const tocArray = [];

  if(installation){
    installation = "[Installation](#installation)";
    tocArray.push(installation);
  }else{
    installation = "";
  }
  if(usage){
    usage = "[Usage](#usage)";
    tocArray.push(usage);
  }else{
    usage = "";
  }
  if(license){
    license = "[License](#license)";
    tocArray.push(license);
  }else{
    license = "";
  }
  if(contribution){
    contribution = "[Contributing](#contributing)";
    tocArray.push(contribution);
  }else{
    contribution = "";
  }
  if(test){
    test = "[Tests](#tests)"
    tocArray.push(test);
  }else{
    test = "";
  }
  tocArray.push(questions);

  tocArray.forEach((item, index) => {
    let num = index + 1;
    if(index == 0) {
      finalTocStr = num + ". " + item;
    } else {
      finalTocStr = finalTocStr + "\n" + num + ". " + item;
    }
  });

  return finalTocStr;
}

//Template literal for the creation of the readme
const generateMarkdown = data => {
  return `# <div style="display: flex; flex-wrap: wrap; justify-content: space-between"><div>${data.title}</div><div>${renderLicenseBadge(data.license)}</div></div>

## Description
${data.description}

## Table of Contents
${dynamicTableOfContents(data)}
${dynamicSections()}
## Questions
For questions, comments, or suggestions, please reach out to [${data.github}](https://github.com/${data.github}) via email at <a href="mailto:${data.email}">${data.email}</a>.
`;
};

module.exports = { generateMarkdown, writeToFile };
