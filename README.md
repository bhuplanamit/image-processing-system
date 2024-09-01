# Image Processing System

## Overview

This project is designed to handle the asynchronous processing of image files uploaded via a CSV file. The application includes endpoints for uploading CSV files, processing images, and checking the status of processing requests.

## Features

- **CSV File Upload:** Allows users to uploadRoute a CSV file containing product information and associated image URLs.
- **Asynchronous Image Processing:** Processes images in the background, ensuring the application remains responsive.
- **Status Checking:** Users can check the status of their processing requests and get detailed information about the processed products.
- **Webhook Notification:** Once all images are processed, a webhook is triggered to notify the user of completion.

## Endpoints

### 1. Upload CSV File

- **Endpoint:** `/uploadRoute`
- **Method:** `POST`
- **Description:** Uploads a CSV file for processing.
- **Request Parameters:**
    - `file`: The CSV file containing product information and image URLs.
- **Responses:**
    - `200 OK`: File uploaded and processed successfully.
    - `400 Bad Request`: Invalid file format or other errors.
    - `500 Internal Server Error`: An internal server error occurred.

### 2. Check Processing Status

- **Endpoint:** `/status/:requestId`
- **Method:** `GET`
- **Description:** Retrieves the status of the processing request.
- **Request Parameters:**
    - `requestId`: The unique identifier for the processing request.
- **Responses:**
    - `200 OK`: Returns the status and details of the processed products.
    - `404 Not Found`: Request not found.
    - `500 Internal Server Error`: An internal server error occurred.

### 3. Webhook Trigger

- **Endpoint:** `/webhook/trigger`
- **Method:** `GET`
- **Description:** Triggers the webhook with the processing status and details.
- **Request Parameters:**
    - `requestId`: The unique identifier for the processing request.
- **Responses:**
    - `200 OK`: Webhook triggered successfully.
    - `400 Bad Request`: Missing required parameters.
    - `500 Internal Server Error`: An internal server error occurred.

## Asynchronous Workers

For detailed information on how asynchronous processing is handled in this project, please refer to the [Asynchronous Workers Documentation](./ASYNC_WORKERS.md).

## API Documentation

API documentation is available via Swagger. To view the documentation, run the application and navigate to `/api-docs` in your browser.

Postman Collection: https://api.postman.com/collections/22095411-e62bd787-17bc-4d42-8ca4-392475643b17?access_key=PMAT-01J6PW0WQBHRTYWMS75HEF1YEH

## Getting Started

### Prerequisites

To set up and run the Image Processing System, you need to have the following software installed on your system:

- **Node.js** (v18 or later)
- **npm** (v6 or later) or **yarn** (v1 or later)
- **Git** (for cloning the repository)
- **MySQL** (for the database)

### Installation

1. **Navigate to the project directory**

   `cd image-processing-system`

2. **Install Dependencies**

   `npm install`
 
3. Configure Environment Variables
   `Open .env file add mysql username and password` 
4. Run Database Migrations

    `SOURCE ./migration/v1.sql;`

5. 5.**Start the Application**

   `npm run app`





   

