# Relational Database Schema

## Table: User

| Field      | Type        | Specifications       | Description                    |
| ---------- | ----------- | -------------------- | ------------------------------ |
| id         | INT         | Primary Key          | Unique identifier for the user |
| name       | VARCHAR(50) | NOT NULL             | Name of the user               |
| email      | VARCHAR(80) | NOT NULL UNIQUE      | User's email address           |
| password   | TEXT        | NOT NULL             | User's hashed password         |
| created_at | TIMESTAMPtz | NOT NULL DEFAULT NOW | Date and time of user creation |
| updated_at | TIMESTAMPtz |                      | Date and time of last update   |

## Table: Task

| Field      | Type         | Specifications                        | Description                       |
| ---------- | ------------ | ------------------------------------- | --------------------------------- |
| id         | INT          | Primary Key                           | Unique identifier for the task    |
| title      | VARCHAR(100) | NOT NULL UNIQUE(title, list_id)       | Title of the task                 |
| completed  | BOOLEAN      | NOT NULL DEFAULT FALSE                | Completion status of the task     |
| list_id    | INT          | Foreign Key referencing Task_list(id) | Identifier of the associated list |
| created_at | TIMESTAMPtz  | NOT NULL DEFAULT NOW                  | Date and time of task creation    |
| updated_at | TIMESTAMPtz  |                                       | Date and time of last update      |

## Table: Task_list

| Field       | Type         | Specifications                   | Description                       |
| ----------- | ------------ | -------------------------------- | --------------------------------- |
| id          | INT          | Primary Key                      | Unique identifier for the list    |
| title       | VARCHAR(100) | NOT NULL UNIQUE(title, user_id)  | Title of the task list            |
| description | VARCHAR(255) |                                  | Description of the task list      |
| user_id     | INT          | Foreign Key referencing User(id) | Identifier of the associated user |
| created_at  | TIMESTAMPtz  | NOT NULL DEFAULT NOW             | Date and time of list creation    |
| updated_at  | TIMESTAMPtz  |                                  | Date and time of last update      |

## Relations

-   **Task_list**: `user_id` is a Foreign Key referencing **User(id)**.
-   **Task**: `list_id` is a Foreign Key referencing **Task_list(id)**.
