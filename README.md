This application will create a simple server that will keep pooling data from the Get-task endpoint resolve its calculations and then submit the result to the submit-task endpoint (1 request every second) validating the returning response.

The application also exposes a simple page (http://localhost:`<port>` where default port is 4000) so you can view  data being processed.

Start by running 
```
npm install 
```

and then you can run 
```
npm start [port]
```

<hr>

# ADP Innovation Labs Pre-Interview Assignment

Hello potential future coworker! :smile:

We're looking forward to having some great days working on creating new projects, debugging issues, planning
applications, solving problems, and all of the other fun things we do here in Innovation Labs - together with you!

But before that, let's see if you can demonstrate some stock skills you'll need to be successful in this position :smiley:

If anything isn't specifically called out here, feel free to be as inventive as you like - no pressure to adhere to any
strict rules. Our primary goal is to know that you generally understand web application principles.

Have fun!

## Task
Create a simple JavaScript (nodejs) application that makes an HTTP GET request to

https://interview.adpeai.com/api/v1/get-task

and then, using the ID and properties returned, dynamically perform the calculation as instructed.

Once you have yourID and your result, make an HTTP POST request to

https://interview.adpeai.com/api/v1/submit-task

with a JSON POST body including the properties `id` and `result`.

The `submit-task` endpoint will return as follows:

Status Code | Description
----------- | -------------
200 | Success
400 | Incorrect value in result; no ID specified; value is invalid
404 | Value not found for specified ID
503 | Error communicating with database

Your code should be able to respond appropriately to these HTTP status codes (at your discretion).
## Evaluation Criteria

- the candidate should not use frameworks like React, Angular, and Express, or bootstraps like create-
react-app and angular cli. Libraries are allowed, just not frameworks.
- a reviewer should be able to clone this repository (e.g. from Github, Bitbucket)
- a reviewer should be able to run `npm install` and get all required dependencies
- a reviewer should be able to run `npm start` to run the application
- a reviewer should be able to see that calls are successful
the work should be free of CORs errors when running on http://localhost

### Bonus Criteria
- While application is running, it gets and submits tasks continuously (without being a DoS attack :smiley:)
- Code is commented where appropriate
- Project is linted with common ESLint config (airbnb, standard) and contains a `lint` script in
`package.json`
- unit tests / end-to-end tests are runnable via `npm test` command
- Report any bugs or issues you find (there shouldn't be any, but who knows :wink:)