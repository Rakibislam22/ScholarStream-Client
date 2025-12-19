# ScholarStream-Client

ScholarStream-Client is the frontend application for connecting students with curated scholarship opportunities worldwide. This React-based client provides a seamless user interface to explore, apply for, and review scholarships, making the process user-friendly and transparent.

---

## Live Demo

Explore the live application:
[ScholarStream Live Demo](https://scholarstream-1.web.app/)

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Environment Setup](#environment-setup)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

This client application supports the following features:
- **Scholarships Discovery**:
  - View scholarships by categories, countries, and deadlines.
  - Top-listed scholarships with detailed information.
- **Application Process**:
  - Easy online application, payment integration, and management of submissions.
- **Dashboard**:
  - A personalized area to manage scholarships, applications, and feedbacks.
- **Transparent Details**:
  - Degree, requirements, and fees required for each scholarship.
  - Aggregated reviews and ratings.
- **Testimonial and Support**:
  - Testimonials from past successful applicants.
  - Integrated support and FAQ pages.

---

## Technologies Used

This repository utilizes the following technologies:
- **Frontend Framework**: React.js
- **Styling/Animations**:
  - Tailwind CSS for styling.
  - Framer Motion for animations.
- **State Management**: React Context API.
- **HTTP Client**: Axios for server communication.
- **Routing**: React Router for navigation.

---

## Environment Setup

### Prerequisites
Ensure you have:
- Node.js and npm (or yarn) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Rakibislam22/ScholarStream-Client.git
   cd ScholarStream-Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables in `.env.local`:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-api-url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## Folder Structure

A brief overview of the project directory:
```
ScholarStream-Client/
├── public/
│   └── index.html       # Entry HTML file
├── src/
│   ├── components/      # Reusable components (Navbar, Footer, etc.)
│   ├── pages/           # App pages (About, Dashboard, etc.)
│   ├── hooks/           # Custom Hooks
│   ├── App.jsx          # Root application component
├── .env.local           # Environment configuration
└── README.md
```

---

## Contributing

Contributions are encouraged! To contribute:
1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes and open a pull request.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Acknowledgements

- Built and maintained with care by [Md Rakib Ali](https://github.com/Rakibislam22).