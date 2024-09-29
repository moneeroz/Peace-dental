# Peace Dental

Peace Dental is a comprehensive web application designed for dental clinics to efficiently manage patients, appointments, invoices, and revenue. The application features simple ui and intuitive navigation, making it easy for both doctors and dental staff to access and manage their data. The project is built using Angular and TypeScript, and utilizes PostgreSQL for database management. Additionally, the application incorporates role-based access control, JWT authentication, and guarded routes to ensure secure access to sensitive areas. Overall, Peace Dental aims to provide a user-friendly and efficient solution for managing dental practices.

## Table of Contents

- [Peace Dental](#peace-dental)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Development server](#development-server)
  - [Build](#build)

## Features

- **User Authentication**: Full JWT-based authentication with role-based access control.
- **Role Management**: Admins can view and manage revenue data while other roles have restricted access.
- **Patient Management**: Add, edit, and remove patient records.
- **Appointment Scheduling**: Schedule, update, and cancel patient appointments.
- **Invoice Management**: Generate, manage and print invoices for services rendered.
- **Revenue Tracking**: View revenue metrics, accessible only to admin users.
- **Guarded Routes**: Implemented route guards to protect sensitive areas of the application.
- **HTTP Interceptors**: Efficiently manage API requests and responses and make sure requests are authorized.
- **Error Handling**: Implemented error handling mechanisms to gracefully handle API errors.

## Technologies

- **Frontend**: Angular, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Authentication**: JWT
- **Other Libraries**: angular-calender, flatpickr, ngx-flatpickr-wrapper, ngx-print, ng-select, date-fns, ngx-charts

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
