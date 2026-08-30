# CarMarket Project

A full-stack car marketplace application with user authentication, car listings, and profile management.

## Features

- User registration and authentication
- Car listing creation and management
- Profile management with image upload
- My Listings page with delete functionality
- Search and filter cars
- Responsive design with modern UI

## Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- React Router
- Zustand (state management)
- Axios
- Lucide React (icons)
- React Toastify

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- Cloudinary (image uploads)

## Installation

### Prerequisites
- Node.js installed
- MongoDB running locally or MongoDB Atlas account
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file based on `.env.example`:
```env
MONGODB_URI=mongodb://localhost:27017/carmarket
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

4. Start backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file based on `.env.example`:
```env
VITE_API_URL=http://localhost:8000
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

4. Start frontend development server:
```bash
npm run dev
```

## Deployment

### Backend Deployment (Render/Heroku)

1. Push code to GitHub
2. Connect your repository to Render/Heroku
3. Set environment variables in deployment platform
4. Deploy - the platform will automatically run `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variables
4. Deploy - platform will automatically run `npm run build`

## Environment Variables

### Backend (.env)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_CLOUDINARY_API_KEY` - Cloudinary API key
- `VITE_CLOUDINARY_API_SECRET` - Cloudinary API secret
- `VITE_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/update/:id` - Update user profile
- `DELETE /api/auth/delete/:id` - Delete user account

### Cars
- `GET /api/cars/all` - Get all cars
- `GET /api/cars/public/:id` - Get car by ID (public)
- `POST /api/cars/create` - Create new car listing
- `GET /api/cars/:id` - Get car by ID (private)
- `PUT /api/cars/update/:id` - Update car listing
- `DELETE /api/auth/listing/:id` - Delete car listing

## Project Structure

```
Carmarket-project/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── zustand/
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Common Issues

1. **MongoDB Connection Error**: Ensure MongoDB is running and MONGODB_URI is correct
2. **CORS Error**: Check that backend CORS settings allow your frontend URL
3. **Image Upload Failed**: Verify Cloudinary API credentials
4. **Authentication Failed**: Check JWT_SECRET matches between frontend and backend

## License

MIT
