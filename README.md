[![IcapServerTest.js CI](https://github.com/filetrust/icap-management-ui-tests/actions/workflows/icapserver-test.js.yml/badge.svg?branch=master)](https://github.com/filetrust/icap-management-ui-tests/actions/workflows/icapserver-test.js.yml)
![FunctionalTest.js CI](https://github.com/filetrust/icap-management-ui-tests/workflows/FunctionalTest.js%20CI/badge.svg)


# icap-management-ui-tests

## Setup

### Prerequisites
- [Docker desktop](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/) 

Clone this repository

#### Install the dependencies: 
npm install (This will install CodeceptJS with Puppeteer and all the dependent packages)

#### Add SharePoint login details 
Current Sharepoint URL in use is: "https://saaspoc1.sharepoint.com"
Create an encoder.js file (this is used to encode your username and password), use sample encoder_sample.js in the src/utils directory
Add your username and password in it, and run "node encoder.js", after this you can remove the file.
Use the encoded username and password in config.json

### Running the tests locally
#### Run all functional tests using: 
npm test
    
#### Run a single test using tags (use option --steps to see detailed execution of steps)
npx codeceptjs run --steps --grep "tag"

#### Run a single test using the file name
npx codeceptjs run "fileName"

#### Run a specific test using tags with reporting
npx codeceptjs run --steps --"tag"  --plugins allure
To view the report, run: allure serve allure/results

### Running the tests in docker container
#### Build the containers:
docker-compose -f docker/docker-compose.test.yml build
docker-compose -f docker/docker-compose.test.yml up -d

#### Execute tests
docker exec codeceptjs codeceptjs run --plugins allure
(use any tag options as required)

#### To view the logs
docker-compose -f docker/docker-compose.test.yml logs -f


## References

- [CodeceptJS](https://codecept.io)
- [Puppeteer](https://pptr.dev/)
- [Allure](http://allure.qatools.ru/)
