# JSON Conversion Tool

This project is a JSON conversion tool built using Node.js. It takes JSON API data as input and outputs JSON data in a different format based on the mapping and rules provided.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Running request in Postman](#running-request-in-postman)
- [API Response Results](#api-response-results)
- [Test Cases Results](#test-cases-results)

## Installation

To install the required dependencies, run the following command in your terminal:

## Usage

### Running the Application

To run the application, use the following command:

```bash
node index.js [--mappings <filename> --rules <filename> --run]
```

The application takes the following command line arguments:

- `--mappings <filename>`: The filename  containing the mappings to be used by the application. If this argument is not provided, the application will use the default mappings which is present in the project directory.
- `--rules <filename>`: The filename containing the rules to be used by the application. If this argument is not provided, the application will use the default rules which is present in the project directory.
- `--run`: This argument is used to run the application in the console. If this argument is not provided, the application will not run in the console.

The application will use the default API data from the following URL:

```bash
https://reqres.in/api/users
```

### Running Tests

To run the test cases, use the following command:

```bash
npm test
```

## Running request in Postman

To run the request in Postman
Send a POST request to the following URL:

```bash
http://localhost:3000/convert
```
![Postman Screenshot](https://i.ibb.co/VH3D2VD/image.png)

## API Response Results

![API Response Screenshot](https://i.ibb.co/TPLwwf1/carbon.png)

## Test Cases Results

![Test Cases Screenshot](https://i.ibb.co/yYDxyxH/image.png)