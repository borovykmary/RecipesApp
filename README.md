# Recipe Book Application

A modern web application for searching and managing recipes using TheMealDB API. Built with React, TypeScript, and Tanstack Query.

## 🌟 Features

- **Recipe Browsing**: Browse through a collection of recipes with beautiful card layouts
- **Detailed Recipe View**: Access comprehensive recipe information including ingredients, instructions, and videos
- **Category Filtering**: Filter recipes by categories
- **Smart Pagination**: Navigate through recipes with an intuitive pagination system
- **Debounced Search**: Efficiently search for recipes with debounced API calls
- **Favorites Management**: Select multiple recipes and get combined ingredients list
- **Responsive Design**: Fully responsive layout that works on all devices

## 🛠 Technologies Used

- React 19
- TypeScript 4.9
- Tanstack Query v5
- Chakra UI v3
- Material UI v6
- React Router v7
- Axios
- Framer Motion
- Create React App

## 📋 Pages

1. **All Recipes Page**

   - Displays recipe cards with:
     - Recipe photo
     - Name
     - Category
     - Origin
   - Features pagination and category filtering
   - Implements debounced search functionality

2. **Single Recipe Page**

   - Shows detailed recipe information:
     - Full ingredients list with measurements
     - Step-by-step instructions
     - Recipe origin
     - Category
     - Recipe image
     - YouTube video (if available)

3. **Favorite Recipes Page**
   - Manages selected recipes
   - Displays combined ingredients list
   - Shows cooking instructions for all selected recipes
   - Calculates total ingredients needed

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Navigate to the project directory:

```bash
cd recipe-app
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Start the development server:

```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔍 Key Implementation Details

- **Modern UI Components**: Built with Chakra UI and Material UI for a polished look
- **Data Caching**: Utilizes Tanstack Query v5 for efficient data caching and management
- **Frontend-only Operations**: Category filtering and pagination are implemented on the frontend
- **API Integration**: Search functionality is implemented through TheMealDB API using Axios
- **Type Safety**: Full TypeScript implementation for better code reliability
- **Animations**: Smooth transitions and animations using Framer Motion

## 🌐 Live Demo

The application is deployed and can be accessed at: [https://recipes-app-umber-omega.vercel.app/](https://recipes-app-umber-omega.vercel.app/)

## 📝 API Reference

This project uses [TheMealDB API](https://www.themealdb.com/api.php) for fetching recipe data. The API provides:

- Recipe listings
- Detailed recipe information
- Category filters
- Search functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details
