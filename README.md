### First make sure you update .env file putting

    REACT_APP_GRAPHQL_TOKEN= "your token here"
    REACT_APP_BASE_URL=https://api.github.com/graphql

    if you don't know how to generate a token i will let you a link here that will help you
    https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

### make sure you run npm install to load all

    if for any reason you are facing a timeout error you can try the next stuff
        -update your .npmrc with
            strict-ssl = false
            ca = null
            registry = http://registry.npmjs.org/
            fetch-retry-mintimeout=200000
            fetch-retry-maxtimeout=1200000
        -if you have an antivirus that provide a vpn active the vpn
        -set the google dns for you os
    wish you luck!!!

### Now we can run the app with the command "npm run start"

### Now we can run test the app with the command "npm run test"

### future updates

    - add more unit test
    - add a navbar
    - add new pages to dig more into the querys
    - add more querys to fetch info from github/graphql
    - add some styles to improve the look
    - add a toast or modal to display errors
