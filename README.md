Hosted link: https://zepto-book-shelve.netlify.app
# Task-Manager
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
  <img src="https://res.cloudinary.com/ddlbvpfq1/image/upload/v1731245064/Case1_kxnchy.png" alt="Image 1" style="width:48%; border: 1px solid black; margin-bottom: 10px;">
  <img src="https://res.cloudinary.com/ddlbvpfq1/image/upload/v1731245064/Case2_t25vhy.png" alt="Image 2" style="width:48%; border: 1px solid black; margin-bottom: 10px;">
  <img src="https://res.cloudinary.com/ddlbvpfq1/image/upload/v1731245067/extra_drag_drop_feature_zy1be4.png" alt="Image 3" style="width:48%; border: 1px solid black;">
  <img src="https://res.cloudinary.com/ddlbvpfq1/image/upload/v1731245185/attachmentcount_regvxi.png" alt="Image 4" style="width:48%; border: 1px solid black;">
</div>

# Kanban Task Manager Web Application

This project is a Kanban Task Manager Web Application built with **React.js** on the frontend. The application provides users with a Kanban board interface for managing tasks and allows uploading attachments to tasks with an organized view. The backend is developed using either **Node.js** or **Laravel/PHP** for file storage and database management.

## Project Features

### Part 1: Kanban Board UI
- **Responsive Design**: The task manager is a single-page application with a horizontal scroll layout, making navigation across tasks easy and accessible.
- **Card Scroll**: Each task card is scrollable within its parent container, allowing multiple tasks to be managed without clutter.

### Part 2: Attachments and Modal
- **Attachment Modal**: Users can pick attachments, which will trigger a modal dialog where files can be previewed.
- **File Upload**: Multiple attachments can be uploaded at once, with each file's original name and extension displayed in a list view.

### Part 3: API Integration for Attachments
- **File Upload API**: Backend API is implemented to store attachments in a database. The API counts the total number of uploaded files for each task.
- **Database Support**: Supports  **Node.js with MongoDB** for attachment storage and retrieval.


## Usage

1. **Task Management**: Add and move tasks across columns with a horizontal scroll layout.
2. **Attachment Modal**: Click on the attachment icon to open a modal for adding files. Users can view the attachment list and file types.
3. **File Uploads**: Select files for upload; files are stored on the server and displayed with a count of attachments per task.


## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js with MongoDB 
- **File Uploads**: Multer (Node.js)
- **Database**: MongoDB

## API Endpoints
- **POST /upload**: Upload attachments to the server.
- **GET /attachments**: Retrieve list of uploaded attachments.

## License
This project is open source and available under the [MIT License](LICENSE).
