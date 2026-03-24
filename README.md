# Appogealtechlabs - Agency Portfolio Platform

A modern, full-stack agency portfolio platform built with **Next.js** (frontend) and **Django** (backend).

## 🚀 Features

### Core Features
- **Portfolio Showcase** - Display projects with tech stack badges
- **Case Studies** - Deep-dive project analysis with problem/solution/results
- **Service Packages** - Tiered pricing (Basic/Standard/Premium)
- **Testimonials** - Client reviews with ratings
- **Contact Forms** - Lead capture with inquiry types
- **Tech Insights** - Educational content about technology choices

### Technical Highlights
- RESTful API with Django Rest Framework
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design (mobile-first)
- Admin dashboard for content management

## 📁 Project Structure

```
Appogealtechlabs.com/
├── appogealtechlabs-backend/    # Django API
│   ├── apps/
│   │   ├── core/                # Base models
│   │   ├── projects/            # Projects & Tech Stack
│   │   ├── services/            # Services & Packages
│   │   ├── testimonials/        # Client reviews
│   │   └── inquiries/           # Contact forms
│   └── appogealtechlabs/        # Django settings
│
└── appogealtechlabs-frontend/   # Next.js App
    ├── app/                     # App Router pages
    ├── components/              # React components
    ├── lib/                     # API client
    └── types/                   # TypeScript types
```

## 🛠️ Tech Stack

### Backend
- **Django 6.0** - Web framework
- **Django REST Framework** - API
- **PostgreSQL** - Database (SQLite for dev)
- **Pillow** - Image processing

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Framer Motion** - Animations

## 🚦 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd appogealtechlabs-backend

# Create virtual environment
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install django djangorestframework django-cors-headers django-filter psycopg2-binary pillow

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

Backend will be available at: `http://127.0.0.1:8000`
Admin panel: `http://127.0.0.1:8000/admin`

### Frontend Setup

```bash
cd appogealtechlabs-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tech-stack/` | GET | List all technologies |
| `/api/projects/` | GET | List all projects |
| `/api/projects/{slug}/` | GET | Get project details |
| `/api/services/` | GET | List services with packages |
| `/api/testimonials/` | GET | List approved testimonials |
| `/api/contact/` | POST | Submit contact form |

### Example API Call

```typescript
import api from '@/lib/api';

// Get all projects
const response = await api.get('/projects/');
const projects = response.data;

// Submit contact form
await api.post('/contact/', {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Project Inquiry',
  message: 'I need a website...',
  inquiry_type: 'quote'
});
```

## 🎨 Design System

The project uses a custom design system with:
- **Colors**: Purple gradient theme (#667eea → #764ba2)
- **Typography**: Segoe UI, system fonts
- **Components**: Reusable cards, badges, forms
- **Animations**: Smooth transitions with Framer Motion

## 📝 Content Management

Access the Django admin panel to manage:
1. **Tech Stack** - Add technologies with descriptions
2. **Projects** - Create projects or case studies
3. **Services** - Define service packages
4. **Testimonials** - Approve/feature reviews
5. **Contact Forms** - View and manage inquiries

## 🔧 Development Workflow

1. **Backend First**: Create models and API endpoints
2. **Test API**: Use Django admin or Postman
3. **Frontend**: Build components and integrate API
4. **Iterate**: Add features incrementally

## 🚀 Deployment

### Backend (Railway/Heroku)
- Set `DEBUG=False`
- Configure PostgreSQL
- Set `ALLOWED_HOSTS`
- Collect static files: `python manage.py collectstatic`

### Frontend (Vercel)
- Set environment variable: `NEXT_PUBLIC_API_URL`
- Deploy: `vercel --prod`

## 📚 Next Steps

- [x] Add authentication for client portal
- [x] Implement blog system
- [x] Add newsletter signup
- [x] Create cost calculator
- [x] Add dark mode toggle
- [x] Implement SEO optimization

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Appogealtechlabs**
- Website: [Coming Soon]
- Email: [Your Email]

---

Built with ❤️ using Next.js and Django
