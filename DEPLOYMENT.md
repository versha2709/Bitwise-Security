# Deployment Guide - Bitwise Security Website

## Quick Start (Development)

1. **Extract the project files**
2. **Navigate to the project directory**:
   ```bash
   cd bitwise-security
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:3000`

## Production Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

Vercel is made by the creators of Next.js and offers the best performance.

1. **Create a GitHub account** (if you don't have one)
2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Import from GitHub
   - Select your repository
   - Click "Deploy"

**That's it!** Your site will be live in minutes with a free URL like `your-project.vercel.app`

You can also add a custom domain in Vercel settings.

---

### Option 2: Netlify (Alternative Free Option)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect to GitHub for automatic deployments

---

### Option 3: Your Own Server (VPS)

If you have a VPS (like DigitalOcean, Linode, or AWS):

1. **Install Node.js** on your server:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Upload your project** to the server

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

5. **Install PM2** (process manager):
   ```bash
   sudo npm install -g pm2
   ```

6. **Start the application**:
   ```bash
   pm2 start npm --name "bitwise-security" -- start
   pm2 save
   pm2 startup
   ```

7. **Set up Nginx** as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Set up SSL with Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

### Option 4: Docker

1. **Create a Dockerfile**:
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Build the image**:
   ```bash
   docker build -t bitwise-security .
   ```

3. **Run the container**:
   ```bash
   docker run -p 3000:3000 bitwise-security
   ```

---

## Custom Domain Setup

### For Vercel/Netlify:
1. Go to your project settings
2. Add your custom domain
3. Update your domain's DNS settings to point to the provided nameservers

### For Your Own Server:
1. Point your domain's A record to your server's IP address
2. Set up SSL with Let's Encrypt (as shown above)

---

## Environment Variables

If you need to add environment variables (for analytics, email services, etc.):

1. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_SITE_URL=https://bitwise-security.nl
   NEXT_PUBLIC_EMAIL=info@bitwise-security.nl
   ```

2. Access in your code:
   ```typescript
   process.env.NEXT_PUBLIC_SITE_URL
   ```

---

## Performance Optimization

The site is already optimized, but here are additional tips:

1. **Enable Image Optimization**: Use Next.js Image component for all images
2. **Add Analytics**: Google Analytics, Plausible, or similar
3. **Monitor Performance**: Use Vercel Analytics or Lighthouse
4. **CDN**: Vercel/Netlify automatically provides global CDN

---

## Troubleshooting

### Build fails:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port already in use:
```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

### Module not found errors:
```bash
# Ensure all dependencies are installed
npm install
```

---

## Maintenance

### Update Dependencies:
```bash
npm update
```

### Check for Security Issues:
```bash
npm audit
npm audit fix
```

---

## Support

For deployment issues:
- Check Next.js documentation: https://nextjs.org/docs
- Vercel support: https://vercel.com/support
- Email: info@bitwise-security.nl
