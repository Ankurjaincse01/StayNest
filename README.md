# StayNest - Property Rental Platform

StayNest is a modern property rental platform built with Node.js, Express, and EJS. It allows users to browse unique stays, create property listings, book reservations, and leave reviews. Inspired by platforms like Airbnb, StayNest provides a seamless experience for both hosts and travelers.

## 🚀 Features

- **Property Management**: Create, view, edit, and delete property listings with image uploads.
- **User Authentication**: Secure signup and login powered by Passport.js.
- **Booking System**: Check-in and check-out date selection with automatic price calculation.
- **Review System**: Rate and review properties with star ratings.
- **Maps Integration**: Interactive maps using Leaflet.js to show property locations.
- **Media Hosting**: Cloudinary integration for professional image management.
- **Modern UI**: Clean and responsive design using Bootstrap and custom CSS.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Templating**: EJS, EJS-Mate
- **Authentication**: Passport.js (Local Strategy)
- **Validation**: Joi (Schema Validation)
- **Storage**: Cloudinary (Multer storage)
- **Styling**: Bootstrap 5, Custom CSS, Font Awesome
- **Maps**: Leaflet.js (OpenStreetMap)

## 📦 Project Structure

- `Nest/` - Core application logic (Moved to root for simplification as requested)
  - `/config` - Database and Cloudinary configuration
  - `/controllers` - MVC Controllers for business logic
  - `/models` - Mongoose schemas for Listings, 
- `init/` - Database initialization and seeding scripts
- `public/` - Static assets (CSS, JS)
- `views/` - Server-side rendered EJS templates

## 🏗️ Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ankurjaincse01/Rental.git
   cd StayNest
   ```

2. **Install dependencies**:
   ```bash
   cd Nest
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `Nest` folder and add your credentials:
   ```
   PORT=3000
   ATLAS_DB=your_mongodb_atlas_url
   SECRET=your_auth_secret
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. **Initialize Database (Optional)**:
   To seed the database with sample listings:
   ```bash
   npm run seed:listings
   ```

5. **Run the application**:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:3000`.

## 📜 License

Distributed under the ISC License.

---
Built with ❤️ by Ankur Jain
