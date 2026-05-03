# 📖 Wordly Dictionary - SPA

A dictionary web app that lets users search for word definitions, hear pronunciations, and find synonyms - all without page reloads.

---

## Planning & Design (Pre-Code Documentation)

### Problem Being Solved
Users need a quick, clean way to look up word definitions without ads or page reloads.

### User Stories
- Search for a word and see definition immediately
- Hear how the word is pronounced
- See example sentences
- Find related words (synonyms)

### Design Decisions
- **SPA Architecture:** No page reloads, faster experience
- **Free Dictionary API:** No API key needed, free to use
- **Color Scheme:** Purple gradient (professional, modern)
- **Responsive Design:** Works on mobile and desktop

### Planned Functions
| Function | Purpose |
|----------|---------|
| `fetchWordData()` | Call API |
| `displayResults()` | Show results |
| `displayDefinitions()` | Show definitions |
| `displayAudio()` | Add audio player |
| `displaySynonyms()` | Show clickable synonyms |
| `showError()` | Handle errors |

### Error Cases Planned
- Empty input → "Please enter a word"
- Word not found → "Word not found, check spelling"
- Network error → "Something went wrong"

---

## Features Implemented

✅ Word search with definitions  
✅ Pronunciation (text and audio)  
✅ Example sentences  
✅ Clickable synonyms  
✅ Loading spinner  
✅ Error handling  
✅ Responsive design  
✅ No page reloads  

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- Free Dictionary API

---

## How to Run

1. Clone repo: `git clone https://github.com/moses-kebee/wordly-dictionary-app.git`
2. Open `index.html` in browser
3. Type a word and click Search

---

## Testing

| Test | Expected Result |
|------|-----------------|
| Search "hello" | Shows definition ✅ |
| Search invalid word | Shows error ✅ |
| Empty search | Shows "enter a word" ✅ |
| Click synonym | Searches that word ✅ |

---

## What I Learned

- Async/await for API calls
- DOM manipulation
- Error handling
- Responsive CSS design
- Working with external APIs

---

**Status:** Complete  
**Date:** May 2026
