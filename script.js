// DOM Elements
const searchForm = document.getElementById('searchForm');
const wordInput = document.getElementById('wordInput');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const results = document.getElementById('results');
const wordTitle = document.getElementById('wordTitle');
const pronunciation = document.getElementById('pronunciation');
const audioContainer = document.getElementById('audioContainer');
const definitionsContainer = document.getElementById('definitions');
const synonymsContainer = document.getElementById('synonyms');
const sourceEl = document.getElementById('source');

// API URL
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Fetch word data from API
async function fetchWordData(word) {
    try {
        const response = await fetch(`${API_URL}${word.toLowerCase()}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Word not found. Please check your spelling.');
            }
            throw new Error('Something went wrong. Please try again.');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// Display audio if available
function displayAudio(phonetics) {
    audioContainer.innerHTML = '';
    
    const audio = phonetics.find(p => p.audio && p.audio.length > 0);
    
    if (audio) {
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = audio.audio;
        audioContainer.appendChild(audioElement);
    }
}

// Display definitions
function displayDefinitions(meanings) {
    definitionsContainer.innerHTML = '';
    
    meanings.forEach(meaning => {
        const definitionItems = meaning.definitions;
        
        definitionItems.forEach((def, index) => {
            const defDiv = document.createElement('div');
            defDiv.className = 'definition-item';
            
            const partOfSpeech = document.createElement('div');
            partOfSpeech.className = 'part-of-speech';
            partOfSpeech.textContent = meaning.partOfSpeech;
            
            const definitionText = document.createElement('div');
            definitionText.className = 'definition-text';
            definitionText.textContent = `${index + 1}. ${def.definition}`;
            
            defDiv.appendChild(partOfSpeech);
            defDiv.appendChild(definitionText);
            
            if (def.example) {
                const example = document.createElement('div');
                example.className = 'example';
                example.textContent = `📝 Example: "${def.example}"`;
                defDiv.appendChild(example);
            }
            
            definitionsContainer.appendChild(defDiv);
        });
    });
}

// Display synonyms
function displaySynonyms(meanings) {
    synonymsContainer.innerHTML = '';
    
    const allSynonyms = [];
    meanings.forEach(meaning => {
        meaning.definitions.forEach(def => {
            if (def.synonyms && def.synonyms.length > 0) {
                allSynonyms.push(...def.synonyms);
            }
        });
    });
    
    if (allSynonyms.length > 0) {
        const uniqueSynonyms = [...new Set(allSynonyms)].slice(0, 10);
        
        const title = document.createElement('div');
        title.className = 'synonyms-title';
        title.textContent = '🔗 Related Words / Synonyms:';
        
        const synonymsList = document.createElement('div');
        synonymsList.className = 'synonyms-list';
        
        uniqueSynonyms.forEach(synonym => {
            const tag = document.createElement('span');
            tag.className = 'synonym-tag';
            tag.textContent = synonym;
            tag.addEventListener('click', () => {
                wordInput.value = synonym;
                searchForm.dispatchEvent(new Event('submit'));
            });
            synonymsList.appendChild(tag);
        });
        
        synonymsContainer.appendChild(title);
        synonymsContainer.appendChild(synonymsList);
    }
}

// Display all results
function displayResults(data) {
    const wordData = data[0];
    
    // Display word title
    wordTitle.textContent = wordData.word;
    
    // Display pronunciation
    if (wordData.phonetic) {
        pronunciation.textContent = `/ ${wordData.phonetic} /`;
    } else {
        pronunciation.textContent = '';
    }
    
    // Display audio
    displayAudio(wordData.phonetics);
    
    // Display definitions
    displayDefinitions(wordData.meanings);
    
    // Display synonyms
    displaySynonyms(wordData.meanings);
    
    // Display source
    sourceEl.innerHTML = `Source: Free Dictionary API | Word: ${wordData.word}`;
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    results.classList.add('hidden');
    
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

// Show loading state
function showLoading() {
    loading.classList.remove('hidden');
    results.classList.add('hidden');
    errorMessage.classList.add('hidden');
}

// Hide loading state
function hideLoading() {
    loading.classList.add('hidden');
}

// Handle form submission
async function handleSearch(event) {
    event.preventDefault();
    
    const word = wordInput.value.trim();
    
    if (!word) {
        showError('Please enter a word to search.');
        return;
    }
    
    showLoading();
    
    try {
        const data = await fetchWordData(word);
        displayResults(data);
        results.classList.remove('hidden');
    } catch (error) {
        showError(error.message);
        results.classList.add('hidden');
    } finally {
        hideLoading();
    }
}

// Event listener for form submission
searchForm.addEventListener('submit', handleSearch);

// Optional: Search on Enter key
wordInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch(event);
    }
});

// Initial focus on input
wordInput.focus();