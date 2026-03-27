# CipherLens - Password Security Analyzer

CipherLens is a modern and interactive password security analyzer that evaluates password strength using real-world cybersecurity principles. It combines entropy-based analysis with advanced pattern detection and integrates industry-grade techniques to provide accurate and meaningful feedback.


##  Live Demo

👉 https://cipherlens-sooty.vercel.app/

---

## Features

* Real-time password strength analysis
* Entropy-based evaluation (randomness measurement)
* Integration with zxcvbn for advanced password analysis
* Detection of weak patterns:
* Sequential patterns (e.g., 123, abc, 654)
* Repeated characters and substrings
* Common words and predictable structures
* Smart suggestions to improve password strength
* Clean, modern, and responsive UI
* Instant feedback as you type

---

##  How It Works

CipherLens analyzes passwords using a combination of:

Entropy calculation to measure randomness
Pattern detection to identify predictable structures
* **zxcvbn integration** to simulate real-world attack strategies (dictionary attacks, pattern-based guesses, etc.)

This hybrid approach ensures that passwords are evaluated not just mathematically, but also from an attacker’s perspective.

---

## Tech Stack

* React
* TypeScript
* Vite
* CSS / Tailwind
* zxcvbn (advanced password strength estimation)

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Madhuriiiii/cipherlens.git
cd cipherlens
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Project Structure

```
cipherlens/
 ├── src/
 │    ├── components/
 │    ├── hooks/
 │    ├── utils/
 │    ├── App.tsx
 │    └── main.tsx
 ├── public/
 ├── index.html
 ├── package.json
 └── vite.config.ts
```

---

## Purpose:

This project demonstrates practical cybersecurity concepts such as password entropy, attack-aware analysis, and real-time feedback systems in an interactive web application.


## Author:

**Madhuri**    
This project marked an early step in my cybersecurity career in exploring cybersecurity concepts through hands-on development.

GitHub: https://github.com/Madhuriiiii

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub!
