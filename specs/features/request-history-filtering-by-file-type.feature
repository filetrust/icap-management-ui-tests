Feature: request-history-filtering-by-file-type
    As a admin I need to validate file requests history filtering by file extension in order to confirm that the solution works as expected

    Background:
        Given I am logged into the ui

    @TEST-163_164_165_180
    Scenario Outline: I am able to filter the risks log
        Given I have navigated to the Request History page
        When I click on the Add Filter button and add a filter selection as <filter>
        Then the result list shows all files as <filteredFile>
        Examples:
            | filter        | filteredFile |
            | fileType_DOC  | DOC          |
            | fileType_DOT  | DOT          |
            | fileType_DOCX | DOCX         |
            | fileType_DOCM | DOCM         |
            | fileType_XLSX | XLSX         |
            | fileType_XLS  | XLS          |
            | fileType_XLSM | XLSM         |
            | fileType_PPT  | PPT          |
            | fileType_PPTX | PPTX         |
            | fileType_JPEG | JPEG         |
            | fileType_PNG  | PNG          |
            | fileType_GIF  | GIF          |
            | fileType_PDF  | PDF          |





