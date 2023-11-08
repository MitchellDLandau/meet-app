Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default.
        Given User has event elements displayed
        When User opens the app
        Then The list of events chould be displaying without their details
    Scenario: User can expand an event to see details.
        Given The Event list has been loaded
        When user selects an event
        Then the event should be expanded displaying more information about the event
    Scenario: User can collapse an event to hide details.
        Given User had selected an event and the event information was displayed along with a hide details button
        When User clicks the hide details button
        Then The display should return to displaying the list of events in the city previously being looked at