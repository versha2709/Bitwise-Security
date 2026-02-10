# Bitwise Security - Professional Penetration Testing Website

A modern, cybersecurity-themed Next.js website for Bitwise Security featuring animated backgrounds, threat stream visualizations, and comprehensive service pages.

## 🚀 Features

- **Animated Cybersecurity Theme**: Particle effects, glowing elements, and dynamic threat stream
- **Responsive Design**: Fully responsive across all devices
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Pages Included**:
  - Home: Dynamic threat stream and hero section
  - Services: Comprehensive pentesting services
  - About: Professional background and methodology
  - Contact: Interactive contact form

## 📦 Installation

1. **Install Dependencies**:
```bash
npm install
```

2. **Run Development Server**:
```bash
npm run dev
```

3. **Open Browser**:
Navigate to `http://localhost:3000`

## 🛠️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
bitwise-security/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   └── CyberBackground.tsx
├── public/
├── package.json
└── tailwind.config.js
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:
- `cyber-blue`: #00f3ff
- `cyber-orange`: #ff6b35
- `cyber-red`: #ff3366
- `cyber-dark`: #0a0e27
- `cyber-darkBlue`: #1a2332

### Content
- **Home Page**: Edit `app/page.tsx`
- **About Page**: Edit `app/about/page.tsx`
- **Services**: Edit `app/services/page.tsx`
- **Contact**: Edit `app/contact/page.tsx`

### Logo
The logo is currently rendered as SVG in the Navigation component. To use your actual logo:
1. Place your logo in the `public/` folder
2. Update `components/Navigation.tsx` to use the image

## 📧 Contact Form

The contact form opens the user's default email client with pre-filled information sent to:
**info@bitwise-security.nl**

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Works out of the box
- **Docker**: Add Dockerfile for containerization
- **VPS**: Use PM2 or similar process manager

## 🔧 Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS animations + Canvas API
- **Icons**: SVG

## 📝 License

Private - All rights reserved to Bitwise Security

## 🤝 Support

For issues or questions, contact: info@bitwise-security.nl
