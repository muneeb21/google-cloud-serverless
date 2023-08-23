# Serverless Blog Api


## Description

A simple serverless blog API using Google Cloud Functions and Nodejs. This project will allow us to create, read, update, and delete blog posts through API
endpoints. This project illustrates the use of Google cloud functions.
- Tech stack used: Nodejs, Expressjs, MongoDb, Google Cloud Functions and Javascript

## Software Requirements to run app

```bash
$ MongoDb
$ Nodejs
$ gcould-sdk

```

## Running the app

```bash

 # Method to run serverless api on local
 - install node version 18
 - run npm i in root directory
 - setup your mongo atlas credentials in .env file
 -  npm run start
 # The function will be accessable on localhost:8080 endpoint
```

## Serverless Deployment
- Google cloud function has been implemented to serve as api endpoint.
- Deployment done on google cloud platform by using `gcloud-sdk`.
- Below is the Api endpoint for the hosted functions.
```bash
# url
https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts
``` 
- Api Details Can be found below

## Api Details

1.  Get all blog posts (method GET)
    - endpoint -> `https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts`
    ```ruby
    curl --location 'https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts'
    ``` 
    #### Response
    ```bash
    # Success
    [
        {
        "_id": "64e6723ec230e37f155bdc11",
        "title": "Basketball",
        "content": "ibasketball is a highly intensive game",
        "author": "James",
        "publicationDate": "2023-08-23T18:37:57.962Z",
        "isArchived": false,
        "createdAt": "2023-08-23T20:55:26.485Z",
        "updatedAt": "2023-08-23T20:55:26.485Z",
        "__v": 0
    },
    {
        "_id": "64e67356c230e37f155bdc16",
        "title": "basketball",
        "content": "It is a very intensive game",
        "author": "James",
        "publicationDate": "2023-08-23T18:37:57.962Z",
        "isArchived": false,
        "createdAt": "2023-08-23T21:00:06.397Z",
        "updatedAt": "2023-08-23T21:00:06.397Z",
        "__v": 0
    }
    ]
    ```

2.  Get blog post by id (method GET)
    - endpoint -> `https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts/:id`
    ```ruby
    curl --location 'https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts/64e66c065e2a21f9211da3f9'
    ``` 
    #### Response
    ```bash
    # Success
    {
    "_id": "64e67eec19905f881a724087",
    "title": "Cricket",
    "content": "It is a very intensive game",
    "author": "Kohli",
    "publicationDate": "2023-08-23T18:37:57.962Z",
    "isArchived": false,
    "createdAt": "2023-08-23T21:49:32.632Z",
    "updatedAt": "2023-08-23T21:49:32.632Z",
    "__v": 0
    }

    # Failures
    {
    "error": "Invalid post ID"
    }

    {
    "error": "Post not found"
    }
    ```
3.  Create new blog post (method POST)
    - endpoint -> `https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts/`
    ```ruby
    curl --location 'https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts/' \--header 'Content-Type: application/json' \--data '{
        "title": "basketball",
        "content": "It is a very intensive game",
        "author": "James",
        "publicationDate": "2023-08-23T18:37:57.962Z"}'
    ``` 

    #### Request body
    ```bash
    {
        "title": "basketball",
        "content": "It is a very intensive game",
        "author": "James",
        "publicationDate": "2023-08-23T18:37:57.962Z"
    }
    ```
    #### Response
    ```bash
    # Success
    {
    "title": "basketball",
    "content": "It is a very intensive game",
    "author": "James",
    "publicationDate": "2023-08-23T18:37:57.962Z",
    "isArchived": false,
    "_id": "64e67356c230e37f155bdc16",
    "createdAt": "2023-08-23T21:00:06.397Z",
    "updatedAt": "2023-08-23T21:00:06.397Z",
    "__v": 0 
    }
    
    # Failure (validations failures)
    {
    "error": "BlogPost validation failed: publicationDate: Path `publicationDate` is required., title: Path `title` is required."
    }
    ```
4.  Update new blog post by Id (method PUT)
    - endpoint -> `https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts/:id`
    ```ruby
    curl --location --request PUT 'https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts/64e67356c230e37f155bdc16' \--header 'Content-Type: application/json' \--data '{
        "title": "tennis",
        "author": "Federer"}'
    ``` 

    #### Request Body
    ```bash
    {
        "title": "tennis",
        "author": "Federer"
    }
    ```
    #### Response
    ```bash
    # Success
    {
    "title": "tennis",
    "content": "It is a very intensive game",
    "author": "Federer",
    "publicationDate": "2023-08-23T18:37:57.962Z",
    "isArchived": false,
    "_id": "64e67356c230e37f155bdc16",
    "createdAt": "2023-08-23T21:00:06.397Z",
    "updatedAt": "2023-08-23T21:01:58.403Z",
    "__v": 0
    }

    # Failures
    {
    "error": "Invalid post ID"
    }

    {
    "error": "Post not found"
    }
    ```

5.  Delete a blog post by Id (method DELETE)
    - endpoint -> `https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts/:id`
    ```ruby
    curl --location --request DELETE 'https://us-central1-fluted-magpie-396811.cloudfunctions.net/gcp-blogpost-func/posts/64e67eec19905f881a724087'
    ```
    #### Response
    ```bash
    # Success
    {
    "message": "Successfully deleted!"
    }

    # Failures
    {
    "error": "Invalid post ID"
    }

    {
    "error": "Post not found"
    }
    ```

## Schema Design of Blog Post

```bash
{
  # all fields are kept mandatory 
  id: ObjectId; (unique) 
  title: string;
  content: string;
  author: string;
  isArchived: boolean;
  publicationDate: Date;
  createdAt: Date,
  updatedAt: Date
}
```



