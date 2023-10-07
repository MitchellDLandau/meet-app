***FILTER EVENTS BY CITY***

Scenario 1 
When user hasn’t searched for a specific city, show upcoming events from all cities.
Given: user hasn’t searched for any city;
When: the user opens the app;
Then: the user should see a list of upcoming events.

Scenario 2
User should see a list of suggestions when they search for a city.
Given the main page is open;
When user starts typing in the city textbox;
Then the user should receive a list of cities (suggestions) that match what they’ve typed;

Scenario 3
User can select a city from the suggested list.
Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
When the user selects a city (e.g., “Berlin, Germany”) from the list;
Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city;

***SHOW/HIDE EVENT DETAILS***

Scenario 1: An event element is collapsed by default.
Given: User had searched for a selected city in the search bar and had cities to choose from;
When: User selects a city from the list;
Then: The list of events in that city chould be displaying without their details;

Scenario 2: User can expand an event to see details.
Given: user had selected a city to display the upcoming events in that city;
When: User selects an event;
Then: The event should be expanded displaying more information about the event;

Scenario 3: User can collapse an event to hide details.
Given: User had selected an event and the event information was displayed along with a hide details button;
When: User clicks the hide details button;
Then: The display should return to displaying the list of events in the city previously being looked at;

***SPECIFY NUMBER OF EVENTS***

Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
Given: The user had selected a city;
When: The user does not specify a number of events to be displayed;
Then: The users number of events displayed should default to 32 events;

Scenario 2: User can change the number of events displayed.
Given: the user had selected a city to view events;
When: The user inputs how many events are to be shown;
Then: The amount of events directed by the user should be displayed;

***USING THE APP WHEN OFFLINE***

Scenario 1: Show cached data when there’s no internet connection.
Given: The user was not online;
When: User attempts to use the application;
Then: Application should draw its information from the cached data it has stored;

Scenario 2: Show error when user changes search settings (city, number of events).
Given: user was not online;
When: User changes the location of the data to be displayed to a city not stored in the cache;
Then: Should be given an error telling the user that this information is not available;

***APP SHORTCUT TO THE HOME SCREEN***

Scenario 1: User can install the meet app as a shortcut on their device home screen.
Given: User had the application installed on their device;
When: The user opens the application from their homescreen;
Then: The application opens to the search page for cities;

*** DISPLAY CHARTS VISUALIZING THE EVENTS IN A CITY ***

Scenario 1: Show a chart with the number of upcoming events in each city.
Given: User had selected a city;
When: The user selects more information about the city;
Then: Charts about the events in that city are displayed;

I will be using serverless functions to be able to allow users to gain access to the google api to receive information about the events.
This will enable easier use for users to gain access to the information and security of the data being accessed. 