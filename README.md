# DevAura - Web Development Agency Landing Page

A modern, responsive landing page for DevAura, a professional web development agency. Built with React, Vite, and TailwindCSS.

## 🚀 Features

- **Modern UI/UX**: Sleek design with smooth animations using Framer Motion
- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**: 
  - Dynamic pricing plans
  - Custom plan builder
  - Contact form
  - Project showcase
  - Tech stack slider
- **Legal Pages**:
  - Terms of Service
  - Privacy & Cookie Policy
  - Refund Policy

## 🛠️ Tech Stack

- **Frontend**:
  - React 18
  - Vite
  - TailwindCSS
  - Framer Motion
  - React Router DOM
  - Lucide React (icons)

- **Backend**:
  - Express.js
  - MongoDB
  - Mongoose
  - Nodemailer
  - CORS

## 🏗️ Project Structure

```
devaurva-landing/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── data/             # Static data and configurations
│   └── assets/           # Images and static assets
├── server/
│   └── models/           # MongoDB schemas
├── public/               # Public assets
└── server.js            # Express backend
```

## 🚦 Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file with:
```env
MONGODB_URI=your_mongodb_uri
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
EMAIL_RECIPIENT=recipient_email
```

4. **Start development server**
```bash
# Start frontend (Vite)
npm run dev

# Start backend (in a separate terminal)
node server.js
```

## 💰 Payment Structure

The project implements a 4-part payment system:
1. 25% - Initial deposit (UI/UX design phase)
2. 25% - Development deposit (before coding)
3. 25% - Midpoint payment
4. 25% - Final payment

## 📝 API Endpoints

- `POST /api/contact` - Handle contact form submissions
- `POST /api/custom-plan` - Process custom plan requests
- `POST /api/card-plan` - Handle standard plan selections

## 🎨 Design Features

- Indigo-based color scheme
- Grid and mesh background patterns
- Smooth scroll animations
- Interactive hover states
- Responsive navigation
- Modern card designs

## 🔒 Security

- Environment variable protection
- CORS configuration
- Secure email handling
- MongoDB authentication

## 📱 Responsive Breakpoints

- Mobile: 0-640px
- Tablet: 641-1024px
- Desktop: 1025px+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request


## 🔗 Links

- [Live Demo](#)
- [Documentation](#)
- [Support](#)
