Feature: Sample search on Google

    @google_chrome
    Scenario: Search for Hello World and first result is a Wikipedia article

        Given I am on Google Search page
        When I search for "Hello World"
        Then I am on Google Results page
        And The first result is Hello World Wikipedia article