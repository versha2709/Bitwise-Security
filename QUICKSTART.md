# 🚀 QUICK START GUIDE

## Get Your Site Running in 3 Steps

### Step 1: Install Node.js
If you don't have Node.js installed:
- Go to https://nodejs.org
- Download and install the LTS version (18.x or higher)

### Step 2: Install Dependencies
Open terminal/command prompt in the project folder and run:
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

**That's it!** Open your browser to http://localhost:3000

---

## 📝 Customizing Your Site

### Change Your Information

1. **Contact Email** - Edit these files:
   - `app/contact/page.tsx` - Update the mailto link
   - Look for: `info@bitwise-security.nl`

2. **About Me Text** - Edit:
   - `app/about/page.tsx` - All your bio and expertise content

3. **Services** - Edit:
   - `app/services/page.tsx` - Modify the services array

4. **Colors** - Edit:
   - `tailwind.config.js` - Change the cyber theme colors

### Add Your Logo

1. Put your logo file in the `public/` folder (e.g., `public/logo.png`)

2. Edit `components/Navigation.tsx`:
   ```typescript
   // Replace the SVG logo section with:
   <Image src="/logo.png" alt="Bitwise Security" width={48} height={48} />
   ```

### Add Your Profile Picture

1. Put your photo in `public/` folder (e.g., `public/profile.jpg`)

2. Edit `app/about/page.tsx`:
   ```typescript
   // Replace the placeholder div with:
   <Image src="/profile.jpg" alt="Profile" width={300} height={300} className="rounded-xl" />
   ```

---

## 🌐 Going Live (Free!)

### Easiest Method - Vercel:

1. Create account at https://vercel.com (free)
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy:
   ```bash
   vercel
   ```
4. Follow the prompts - your site will be live in minutes!

---

## 📱 Testing on Mobile

While the dev server is running:
1. Find your computer's IP address
2. On your phone, visit: `http://YOUR-IP:3000`
3. Make sure your phone and computer are on the same WiFi

---

## 🆘 Common Issues

### "npm: command not found"
→ Install Node.js from https://nodejs.org

### "Port 3000 is already in use"
→ Run: `npx kill-port 3000` then try again

### Changes not showing up
→ Refresh your browser or restart the dev server

---

## 📚 Next Steps

1. ✅ Get the site running locally
2. ✅ Customize your content
3. ✅ Add your logo and photos
4. ✅ Test on mobile
5. ✅ Deploy to Vercel
6. ✅ Add your custom domain (optional)

---

## Need Help?

- Read the full README.md
- Check DEPLOYMENT.md for detailed deployment instructions
- Email: info@bitwise-security.nl
