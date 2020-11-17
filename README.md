![FunctionalTest.js CI](https://github.com/filetrust/icap-management-ui-tests/workflows/FunctionalTest.js%20CI/badge.svg)
![Prototype-test CI](https://github.com/filetrust/icap-management-ui-tests/workflows/Prototype-test%20CI/badge.svg)

# icap-management-ui-tests

# Running Tests

    Run all tests using: npm test
 
    Run a single test using tags
    npx codeceptjs run --steps --<tag>

    Run a single test using the file name
    npx codeceptjs run <fileName>

    Run a specific test using tags with reporting
    npx codeceptjs run --steps --<tag>  --plugins allure
    
    Run a specific test by search
    npx codeceptjs run --grep "search-crieteria"
