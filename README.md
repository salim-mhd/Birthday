# 🌸 Sayana's 21st Birthday Surprise Website ✨

An aesthetic, romantic, and interactive 21st birthday website lovingly crafted for **Sayana** by **Salim**.

Built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, **Canvas Confetti**, and **MongoDB Atlas**.

---

## 🌟 Interactive Highlights & Features

1. **👑 Grand 21st Milestone Greeting & Hero Section**:
   - Features the custom 21st Birthday photo collage poster of Sayana (`/images/sayana-poster.jpg`).
   - Interactive **Blow 21 Candles on the Birthday Cake 🎂** with realistic flickering flames, smoke effect, and celebratory confetti blast.
   - Floating milestone badges honoring Chapter 21.

2. **📸 Moments in Time - Polaroid Gallery**:
   - Features all 4 authentic photos of Sayana:
     - *The 21st Milestone Queen* (Poster)
     - *That Jhumka & Sparkling Smile* (Store selfie)
     - *Simply, Effortlessly Beautiful* (Gentle smile)
     - *Sunlit Laughter & Sunshine* (Outdoor golden hour smile)
   - Cute washi-tape polaroids, interactive like counters, and click-to-expand modal showing Salim's personal diary notes behind each photo.

3. **🍫 Her Favorite Things (The Cheat Sheet to Sayana's Heart)**:
   - **Chocolates 🍫**: The instant mood lifter & Salim's pocket cheat code.
   - **Late Night Ice Cream 🍦**: Double scoops at 1 AM.
   - **Midnight Rides 🏍️🌌**: Cold wind, empty roads, and holding on tight.
   - **Aromatic Biriyani 🍲**: The only true competitor to Salim's love!
   - Interactive **Happiness Meter** that increases when tapping her favorites!

4. **💧 "Drink Your Water, My Princess!" Hydration Care Reminder**:
   - Salim's caring alert for Sayana.
   - Interactive animated water glass with rising water levels & bubbles.
   - Counter to track glasses of water with loving compliments.

5. **💍 "Will You Marry Me?" The Proposal Game**:
   - The interactive proposal with a **dodging "NO" button** that playfully runs away whenever hovered or clicked, cycling through humorous messages (*"Salim said No is forbidden!", "Error 404: No option found!"*).
   - The **"YES" button** pulses and expands with every dodge.
   - Clicking **YES** triggers an explosive multi-stage fireworks confetti celebration, ring display, and persists her acceptance directly into **MongoDB Atlas**!
   - Allows Sayana to leave a personal reply or love vow back to Salim.

6. **🎁 21st Birthday Surprise Gift Boutique**:
   - Interactive surprise claim station with all requested gifts:
     - 💫 **Delicate Anklet (Payal)**: Handfastened by Salim.
     - 💋 **Gentle Forehead & Sweet Kisses**: Lifetime unlimited refills.
     - 🫂 **Tight 5-Minute Bear Hug**: Safe harbor for stressful days.
     - 🍫 **Silky Chocolate Hamper**: Constant sweetness.
     - 🍦 **Midnight Ice Cream Date**: Waffle cone drives.
     - ✨ **Exquisite Belly Chain**: Royal adornment.
     - 🌹 **Fresh Crimson Roses**: Bouquets + eternal preserved rose.
   - Generates official vouchers and saves her selected wishlist to MongoDB Atlas (`/api/gifts`).

7. **🏆 21 Reasons Why I Love Sayana**:
   - 21 personalized romantic reasons honoring her 21st year.

8. **💌 "Thank You For Coming Into My Life" Love Letter**:
   - Interactive vintage wax seal letter (`S&S` monogram).
   - Unfolds into a parchment letter expressing Salim's gratitude for her coming into his life, bringing joy, laughing together, and standing by him.

9. **📌 Live Love Notes Guestbook**:
   - Real-time message board connected to MongoDB Atlas (`/api/messages`).

10. **🎶 Romantic Acoustic Music Box**:
    - Floating music player widget with audio equalizer animation playing dreamy music-box chords in real time.

---

## 🚀 Running the Project

### Local Development:
```bash
npm run dev
# Open http://localhost:3000 (or 3001) in your browser
```

### Production Build:
```bash
npm run build
npm start -- -p 3001
```

---

## ☁️ Deploying to Vercel (1-Click Free Hosting)

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Happy 21st Birthday Sayana!"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and import the repository.
3. In the **Environment Variables** section on Vercel, add:
   ```
   MONGODB_URI = mongodb+srv://salimmhd1280_db_user:dvw49BdQZDJsHSki@cluster0.axug69j.mongodb.net/birthday?retryWrites=true&w=majority
   ```
4. Click **Deploy**! You will get a live link like `https://sayana-21st-birthday.vercel.app` to send directly to Sayana!
