# VP App Frontend - AI-Powered Valuation System

React frontend for the AI-powered property valuation system.

## 🚀 Features

- **Professional Authentication**: Login, registration, email verification
- **User Dashboard**: Statistics, recent reports, profile management
- **Profile Management**: IVSL-compliant professional profiles
- **Document Upload**: Drag-and-drop interface (ready for backend integration)
- **Location Intelligence**: Interactive mapping and geocoding
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🛠️ Technology Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **State Management**: React Query + Context API
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Icons**: Heroicons
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

## 📋 Application Pages

### Authentication
- `/login` - User login
- `/register` - Professional registration
- `/verify-email` - Email verification

### Protected Pages
- `/dashboard` - User dashboard with statistics
- `/profile` - Profile management
- `/documents` - Document upload and management (Task 2)
- `/location` - Location intelligence tools (Task 3)
- `/reports` - Report generation (Task 4)

## 🔧 Environment Variables

The frontend automatically connects to the backend API. For production deployment:

```env
# Backend API URL (automatically configured in production)
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🚀 Deployment

### Railway Deployment

1. **Create Railway Project**
   ```bash
   railway login
   railway new
   ```

2. **Connect GitHub Repository**
   - Connect to: `https://github.com/Malith-nethsiri/VP-2-frontend`
   - Auto-deploy from main branch

3. **Set Environment Variables** (if needed)
   ```bash
   railway variables set REACT_APP_API_URL=https://your-backend-url.com/api
   ```

4. **Deploy**
   ```bash
   railway up
   ```

### Manual Deployment

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Serve Built Files**
   ```bash
   npm run serve
   ```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.js    # Main app layout
│   │   └── ProtectedRoute.js
│   ├── contexts/        # React contexts
│   │   └── AuthContext.js
│   ├── pages/           # Page components
│   │   ├── auth/        # Authentication pages
│   │   ├── Dashboard.js
│   │   ├── Profile.js
│   │   ├── Documents.js
│   │   ├── Location.js
│   │   └── Reports.js
│   ├── utils/           # Utility functions
│   │   └── api.js       # API client
│   ├── App.js           # Main app component
│   ├── index.js         # App entry point
│   └── index.css        # Global styles
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies
```

## 🎨 UI Components

### Form Components
- `form-input` - Styled input fields
- `form-label` - Consistent labels
- `btn-primary` - Primary action buttons
- `btn-secondary` - Secondary action buttons

### Layout Components
- `card` - Content containers
- `badge` - Status indicators
- Custom responsive navigation

### Color Scheme
- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

## 🔐 Authentication Flow

1. **Registration**: Professional valuer registration with IVSL fields
2. **Email Verification**: Automated email verification system
3. **Login**: JWT-based authentication
4. **Protected Routes**: Automatic redirection for unauthenticated users
5. **Profile Management**: Real-time profile updates

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layouts for tablet screens
- **Desktop**: Full-featured desktop experience
- **Accessibility**: Screen reader compatible

## 🔧 API Integration

The frontend uses Axios for API communication with:

- **Base URL**: Automatically configured via proxy or environment variable
- **Authentication**: JWT tokens stored in secure cookies
- **Error Handling**: Global error interceptors
- **Loading States**: React Query for caching and loading states

## 🎯 Features by Task

### ✅ Task 1: Authentication & Profile Management
- Professional registration with IVSL compliance
- Email verification workflow
- Profile management with qualifications
- Dashboard with statistics

### ✅ Task 2: Document Upload (Interface Ready)
- Document upload interface designed
- File type validation
- Processing status tracking
- Ready for backend integration

### ✅ Task 3: Location Intelligence
- Interactive geocoding interface
- Reverse geocoding
- Amenity discovery
- Map generation
- Real-time results display

### 🔄 Task 4+: Future Features
- Report generation interface
- Data collection forms
- Export capabilities
- Advanced AI features

## 🛡️ Security Features

- **Secure Authentication**: JWT tokens in httpOnly cookies
- **Route Protection**: Automatic redirect for unauthorized access
- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS Enforcement**: Production HTTPS requirements

## 📊 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Optimized static assets
- **Caching**: React Query for efficient data caching
- **Bundle Size**: Optimized production builds

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📝 License

Proprietary - All rights reserved

---

**Status**: Production Ready | **Version**: 1.0.0 | **Last Updated**: January 2025