# AutoLimpio

## Live link - [AutoLimpio](https://auto-limpio-client.vercel.app/)

## Admin Access

-user: admin@autolimpio.com
-password: admin123456

## Introduction

Using the AutoLimpio car wash and service booking portal, customers can plan convenient time slots for their vehicle care and browse a variety of car maintenance services. It is simple for users to choose the services they want, schedule appointments, and keep track of future reservations. Administrators are able to control user roles, schedule slots according to services, and effectively manage all reservations.

This guide will help you set up and run the project locally on your machine.

## Features

- Debounced API calls to optimize search functionality and reduce excessive requests
- Service comparison tool to help users choose the best option
- Countdown timer for upcoming bookings

## Technology Stack

- Frontend: React.js
- Language: TypeScript
- UI: Shadcn and Tailwind CSS
- State Management: Redux Toolkit & Redux Query

## Getting Started

To get started with the project, follow these instructions:

### Prerequisites

Make sure you have the following software installed on your machine:

- Git
- Node.js (v20.9.0 recommended)
- npm or any package installer

### Cloning the Repository

Clone the project repository with the following command:

```
git clone https://github.com/AkashAkter/auto-limpio-client.git

```

### Installing Dependencies

After cloning the project, open the terminal, navigate to the project folder, and run: `npm install`

```
npm install

```

### Setting Up Environment Variables

Create a .env file in the root directory of the project and add your MongoDB credentials:

```
VITE_BASE_API=https://auto-limpio-server.vercel.app/api
```

### Running the Project

Once you have set up the environment variables, you can run the project locally.

```
npm run dev

```

### Accessing the Project

```
http://localhost:5173
```
