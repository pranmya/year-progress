# ⏳ Rings of Time

> A deeply stoic, dynamically generated wallpaper tracking the passage of time.

<div align="center">
  <img src="https://year-progress-kappa.vercel.app/api/wallpaper?w=1080&h=2400" width="350" alt="Rings of Time Live Wallpaper">
</div>

**🌐 [Visit the Live Website & Get Your URL](https://year-progress-kappa.vercel.app)**

---

## 🎨 Anatomy of the Design

Rings of Time isn't just a clock—it's a philosophical dashboard designed perfectly for your phone's lock screen. Every single visual element is mathematically calculated based on the exact day of the year.

* **The Stride Word (Top)**: A daily motivational anchor word chosen from a curated list of stoic concepts (e.g., RELENTLESS, ENDURE, DISCIPLINE).
* **The Chrono-Tracker**: Displays the exact date, the day of the week, exactly how many days are left in the year, and the percentage of the year completed.
* **The Rings of Months (Center)**: 12 concentric rings representing the months of the year. Passed months are solid white. The current month is a vibrant purple-to-orange gradient that slowly fills up its ring as the days pass. Future months remain dim.
* **The 52 Weeks**: The tiny orbital dots surrounding the outermost ring represent the 52 weeks of the year. They light up one by one as the weeks pass.
* **The Stoic Quote (Bottom)**: A daily grounding quote from historical philosophers like Marcus Aurelius, Seneca, and Plato.

---

## ⚡ How it Works (Under the Hood)
This project is powered by a **Serverless Node.js API** hosted on [Vercel](https://vercel.com).

There are no static images saved in this repository. Whenever your phone makes a request to the Vercel API endpoint, Vercel instantly spins up a micro-server, calculates the exact time, mathematically draws the canvas in memory using the `canvas` library, and beams a high-resolution PNG image directly to your device. 

It is a 100% dynamic, on-the-fly generation pipeline.

---

## 📱 How to Automate (Android Setup)

You can turn this API into a live wallpaper that refreshes automatically every single morning using the free [Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate) app by LlamaLab.

Here is the exact Flow you need to build:

### 1. The Trigger (Time Await)
* Add a **Time await** block. 
* Set the "Time of day" to **00:01 (Midnight)**. Because this is a live API, it updates the very second the clock strikes midnight!

### 2. The Fetch (HTTP Request)
* Connect the "OK" dot of the Time block to an **HTTP request** block.
* **Method**: `GET`
* **Request URL**: `https://year-progress-kappa.vercel.app/api/wallpaper`
* **Save response path**: Type exactly `Download/wallpaper.png`

### 3. The Display (Wallpaper Set)
* Connect the "OK" dot of the HTTP block to a **Wallpaper set** block.
* **Image URI**: Type exactly `Download/wallpaper.png`

### 4. The Infinite Loop
* **Crucial Step**: Connect the "OK" dot of the Wallpaper Set block back up to the "IN" dot of the Time Await block! This ensures the app loops forever and updates your wallpaper every single night without you doing anything.
* Save the Flow and click **Start**!
