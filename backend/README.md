# Backend


## Features

+ Python FastAPI backend.
+ MongoDB database.
+ Authentication
+ Chat API


## Using the applicaiton

To use the application, follow the outlined steps:


```console
$ docker compose up -d --build
```


The starter listens on port 8000 on address [0.0.0.0](0.0.0.0:8080). 



## Testing

To run the tests, run the following command:
1. Create a virtual environment in it:

```console
$ python3 -m venv venv
```
2. Install the modules listed in the `requirements.txt` file:

```console
(venv)$ pip3 install -r requirements.txt
```
3. Run test:

```console
(venv)$ pytest
```
