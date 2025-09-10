# TruScribe - AI-Powered Career Fact-Checker

A modern, responsive landing page for TruScribe, inspired by the clean design of Moss.com. This project replicates the visual design and layout structure while adapting the content for career fact-checking services.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd truscribe-landing
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Responsive Design

The design has been tested and optimized for the following breakpoints:
- **Desktop**: 1280px+ (Primary design target)
- **Laptop**: 1024px - 1279px
- **Tablet**: 768px - 1023px  
- **Mobile**: 375px - 767px

## 🎨 Design System

### Colors
- **Primary**: `#0f4c3a` (Dark green, inspired by Moss)
- **Secondary**: `#1a5f4a` (Medium green)
- **Accent**: `#7dd321` (Bright green for CTAs)
- **Light**: `#f8fffe` (Off-white)
- **Gray**: `#6b7280` (Text gray)

### Typography
- **Display Font**: Poppins (headings, hero text)
- **Body Font**: Inter (body text, UI elements)
- **Hero Text**: 48px desktop, 40px mobile
- **H2**: 32px
- **Body**: 16px

### Spacing
Uses a 4px base spacing scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main landing page
│   └── results/
│       └── page.tsx         # Results page (existing)
├── components/
│   └── ui/                  # Reusable UI components
├── public/
│   ├── truscribe-mobile-mockup.png
│   ├── truscribe-dashboard-mockup.png
│   └── truscribe-analysis-mockup.png
├── tailwind.config.ts       # Tailwind configuration
└── README.md
\`\`\`

## 🖼️ Assets to Replace

Before public deployment, replace the following placeholder assets:

### Images
- `/public/truscribe-mobile-mockup.png` - Mobile app interface mockup
- `/public/truscribe-dashboard-mockup.png` - Desktop dashboard mockup  
- `/public/truscribe-analysis-mockup.png` - Analysis results mockup

### Content
- Company logos in trust section (currently placeholder)
- Hero background pattern (currently CSS-generated)
- Product screenshots (currently AI-generated placeholders)

## ⚡ Performance Features

- **Lazy Loading**: Images load as they enter viewport
- **Scroll Animations**: Fade-in-up animations on scroll
- **Optimized Fonts**: Google Fonts with display=swap
- **Responsive Images**: Next.js Image component with optimization
- **Minimal JavaScript**: CSS-first animations where possible

## 🎯 Key Components

### Header
- Sticky navigation with backdrop blur
- Responsive mobile menu
- Dropdown navigation (Products, Resources)
- CTA buttons with hover effects

### Hero Section
- Full-screen gradient background
- Centered content layout
- Trust badge with verification icon
- Dual CTA buttons
- Product mockup grid

### Features Section
- 3-column responsive grid
- Hover effects on cards
- Icon integration
- Scroll-triggered animations

### Trust Section
- Company logos strip
- Responsive logo grid
- Opacity effects

## 🔧 Customization

### Colors
Update colors in `tailwind.config.ts`:
\`\`\`typescript
colors: {
  'moss-primary': '#0f4c3a',
  'moss-secondary': '#1a5f4a', 
  'moss-accent': '#7dd321',
  // ... other colors
}
\`\`\`

### Typography
Modify fonts in `tailwind.config.ts`:
\`\`\`typescript
fontFamily: {
  'sans': ['Inter', 'system-ui', 'sans-serif'],
  'display': ['Poppins', 'system-ui', 'sans-serif'],
}
\`\`\`

### Animations
Scroll animations can be customized in `globals.css`:
\`\`\`css
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}
\`\`\`

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Manual Build
\`\`\`bash
npm run build
npm start
\`\`\`

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Focus-visible indicators
- Color contrast compliance (WCAG AA)
- Keyboard navigation support

## 🐛 Known Issues

- Mobile menu animation could be smoother
- Some hover effects may not work on touch devices
- Hero background pattern may not display in older browsers

## 📄 License

This project is for internal/development use only. Replace all placeholder content and assets before public deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test responsiveness at all breakpoints
5. Submit a pull request

---

**Note**: This design is inspired by Moss.com for educational/development purposes. All proprietary assets have been replaced with placeholders. Replace all content and assets before public deployment.
