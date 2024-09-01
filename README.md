# Image Processing System

## Overview

This project is designed to handle the asynchronous processing of image files uploaded via a CSV file. The application includes endpoints for uploading CSV files, processing images, and checking the status of processing requests.

## Features

- **CSV File Upload:** Allows users to uploadRoute a CSV file containing product information and associated image URLs.
- **Asynchronous Image Processing:** Processes images in the background, ensuring the application remains responsive.
- **Status Checking:** Users can check the status of their processing requests and get detailed information about the processed products.
- **Webhook Notification:** Once all images are processed, a webhook is triggered to notify the user of completion.

## Technical Documentation
[Technical Documentation for project](./documentation/technicalDocumentation.md)

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





   

