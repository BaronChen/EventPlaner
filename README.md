Set up instruction 

* Install nodejs from https://nodejs.org/en/
* Install and configure mongodb from https://docs.mongodb.org/getting-started/shell/
* Clone the repo
* Install global tsc, typings and gulp by running:
   

```
  npm install gulp -g 
  npm install tsc -g 
  npm install typings -g 
  npm install karma-cli -g
```

          
* Inside the root directory of your repo, run the following command:
   

```
 npm install 
 typings install
```

Build:
```
gulp build-dev
```

Unit tests:
```
gulp unit-tests-backend //Run backend unit tests
gulp unit-tests-frontend //Run frontend unit tests
```

