Feature: Show/Hide Event Details
    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given The user had selected a city
        When The user does not specify a number of events to be displayed
        Then The users number of events displayed should default to 32 events
    Scenario: User can change the number of events displayed.
        Given the user had selected a city to view events
        When the user inputs how many events are to be shown
        Then The amount of events directed by the user should be displayed