## Approach

My approach to this challenge was a simple and commone one, I first identified some test cases with edge cases and finally I broke down the challenges to some simplier tasks

### Test Cases

Feature: Calculate 50 year interest

As a user, I want to calculate my balance over the next 50 years by giving a starting amount, monthly deposit amount and an annual interest rate.

Scenario: User gives input

> Given the user is on the finimize calculator page<br />
> And the user can see the calculator inputs<br />
> When the user changes the user selects an input box<br />
> Then a their values are stored by the system.

Scenario: System fetches calculation

> Given the user is able to give input<br />
> When the user makes a change to an input value<br />
> Then an api call is made to the server with the values<br />
> And recieves a response with the calculation

Scenario: System fetches calculation

> Given the api call has been made<br />
> When the response has the calculated values<br />
> Then a graph should be displayed<br />

Scenario: User gives invalid input

> Given the user gives input<br />
> And the api call is made<br />
> When the input values are invalid<br />
> Then the server returns error messages<br />
> And the error messages are displayed on the respective inputs<br />
> And the page does not show the graph

### Basic Task Break down

- Create an input form for the values
- Display both the input form and the graph on the screen
- Structure the server folders
- Create the server calculation service
- Create the server endpoint
- Make the API call when a value is changes on the frontend
- Display the returned values with the graph
- Add debounce the the api call
- Add field error handling to the server
- Add Error handling to the frontend

## Features

### Formik

I chose to use Formik as I have used it before and it contains almost all the feature that is required for handling forms.

-might be overkill
-not suited for send onChange - use effect seems unstable

### Debounced API call

When making the API calls onChange, it is likely the user will change multiple values at once, or more simply they will write large than single character values. This would typically trigger an api call each time,

> As we type 100
> typed: 1 -> call(1)
> typed: 10 -> call(10)
> typed: 100 -> call(100)

in this example we would have made 3 api calls when we only care about the last call. Adding a debounce minimizes the number of calls we make, improving performance

### Server file structure

The server is structures using the "onion architecture".

📦server<br />
┣ 📂api<br />
┣ 📂data<br />
┣ 📂models<br />
┣ 📂routes<br />
┣ 📂services<br />
┣ 📂utils<br />
┗ 📜server.ts

server -> routes -> api -> Services -> data

In this case the data layer is empty but I have included it for demonstration purposes

## improvements

- API_BASE_URL should be moved to an environment file.
- Calculation endpoint could be better suited as a post request to make use of the body.
- I chose an iterative solution for calculating compound, but this could be done using a formulaic solution.

### Graph Sizing

The Graph sizing was a little tricky, I wanted to maximise it's size, but I struggled to manage it's aspect ratio. This means that on some screen sizes it overflows out of the bottom and should be a fairly straight forward fixed given one spent the time on it.
Additionally, when the window size was adjusted, the graph would resize to get bigger but it would not resize to get smaller.

### client types

I chose to store types that are tightly coupled with a component in the component file, and others in a types folder. This is relies on subjective rules and could be confusing for another developer to follow. A better way could be to keep types in a component folder with the component file but in a separate type file.
