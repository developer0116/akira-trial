# Artisan Trial Project

## How to run

To run the project, follow these steps:

Inside the /backend folder, please copy .env.sample to .env.

And then, go to the root folder and run this command.
```console
$ make up
```

The app will run on http://localhost:3033

## Testing

### Backend

To run the tests, run the following command:

1. Go to the backend folder:

```console
$ cd backend
```
2. Create a virtual environment in it:

```console
$ python3 -m venv venv
$ source venv/bin/activate
```
3. Install the modules listed in the `requirements.txt` file:

```console
(venv)$ pip3 install -r requirements.txt
```
4. Run test:

```console
(venv)$ pytest
```

### Frontend

To run the tests, run the following command:

1. Go to the frontend folder:

```console
$ cd frontend
```
2. Run test:

```console
$ yarn test
```