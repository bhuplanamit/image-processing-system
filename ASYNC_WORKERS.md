# Asynchronous Workers

## Overview

This document provides an overview of the asynchronous processing implemented in the project. The application uses asynchronous workers to handle time-consuming tasks such as image processing.

## Background Task Handling

### Image Processing
- The image processing tasks are handled asynchronously to ensure that the main application remains responsive.
- When a CSV file is uploaded, the application spawns background tasks for processing each image associated with the products listed in the CSV.

### Flow

1. **File Upload:**
    - The user uploads a CSV file through the `/uploadRoute` endpoint.
    - The CSV file is parsed, and a new processing request is created with a unique `requestId`.

2. **Processing Request:**
    - Each product in the CSV is processed asynchronously.
    - The application validates the URLs and processes the images, storing the output URLs in the database.

3. **Webhook Trigger:**
    - Once all products for a request have been processed, a webhook is triggered to notify the completion of the task.

### Error Handling
- If an error occurs during processing, the error is logged, and the system can be configured to retry the task or mark it as failed.

## Technologies Used

- **Node.js:** Handles the asynchronous execution of tasks.
- **Multer:** Manages file uploads.
- **Axios:** Used for making HTTP requests during image processing.
- **Sharp:** Used for image processing tasks.

## Future Enhancements

- Consider using a dedicated job queue like Bull or Agenda for more robust task management.
- Implement retry logic for transient errors.

