![.github/workflows/node.js.yml](https://github.com/filetrust/icap-management-ui-tests/workflows/.github/workflows/node.js.yml/badge.svg)

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
