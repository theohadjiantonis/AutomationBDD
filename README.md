# Introduction 
This project was done with scalability in mind and is presented as a complete solution for the Pet Service. The steps might seem a bit vague, programmatically wise, and require a lot of input from the user,
e.g. Then The update pet with form response has error code 404 with message 'java.lang.NumberFormatException: For input string: \"hello\"', type "unknown" and status 404, here the user has to provide the status code, a string for type,
a message string, and an error code. This is done purposely, with one step we can cover errors that range from a 400 bad request, to a 500 server error response, as long as the error responses are handled gracefully server-side 
and have the same general structure.

e.g 
{
  "code": 404,
  "type": "unknown",
  "message": "java.lang.NumberFormatException: For input string: \"hello\""
}

# Getting Started
1.	Software dependencies
2.	Run scenario process
3.	API references
4.	Bugs identified throughout the process
5.	Final Comments

# Dev dependencies
The application is build on nodeJS using CodeceptJS as a framework. I use mocha for reporting and puppeteer as a webdriver. 
For a full list of depencies please check package.json

# Run scenario process
Due to the dependencies used in this solution I suggest running the Dependencies_installation.sh shell script executable in the root folder of the project. 
If you don't want to, then I suggest installing them using a powershell window by shift+righ click in the root of the project directory

Dependencies:
npm install nodejs
npm install codeceptjs
npm install puppeteer
npm install mocha
npm install mochawesome
npm install mocha-multi
npm install mocha-junit-reporter
npm install chai
npm install dotenv
npm install json-schema-faker

To run a scenario I again suggest you simply run the appropriate shell script executable.
If you want to run them through powershell, the open a powershell window and run the following command

npx codeceptjs run <path to feature file you want to run> --reporter mocha-multi

e.g
npx codeceptjs run ./features/PetAPI/Add_Pet.feature --reporter mocha-multi

# API references
Requests are constracted in the ./api_requests/PetHelpers.js
Basically there I handle payloads, headers and endpoints before sending them to ./common_packages/RequestHandler.js, which as the name suggest is the request handler, whose only job is to send the appropriate HTTP request. 
This keeps the code clean and readable in both JS files

# Bugs identified throughout the process
For the Add_pet API I went on a deep dive and thoroughly tested  it in order to demonstrate that I can both create solid automation solution but also have the mind of a tester. I was able to identify multiple issues
with the request and are all documented in the reports. 
I've found issues with all APIs but due to time constrains I elected to only automate a "happy scenario" where everything should work, and one invalid scenario

Reports for each run can be found under ./output/

# Final Comments
With the steps I've created I only create the minimum scenarios that are available. Given more time, multiple scenarios can be created just by combining the existing code, the posibilities are quite vast. 
Alas, time is not infinite, hence the "corner cuts" in most scenarios. I hope that this atleast demonstrates what I'm capable to do given time. 

If for any reason, you are not able to run the scenarios or something seems off please do not hesitate to get in touch. 