const loading = document.getElementById('loading');
const synoname = document.getElementById('synoname');
const name = document.getElementById('name');
const audio = document.getElementById('audio');
const definition = document.getElementById('definition');
const error = document.getElementById('error');
const results = document.getElementById('results');
const wordresultscontainer = document.getElementById('wordresultscontainer');
const loaderbar = document.getElementById('loaderbar');
const partOfSpeech = document.getElementById('partOfSpeech');
const synoname_2 = document.getElementById('synoname_2');

const partOfSpeech_2 = document.getElementById('partOfSpeech_2');
const definition_2 = document.getElementById('definition_2');
const data_p_dev = document.getElementById('data_p_dev');
const synoname_3 = document.getElementById('synoname_3');
const partOfSpeech_3 = document.getElementById('partOfSpeech_3');
const partOfSpeech_4 = document.getElementById('partOfSpeech_4');
const definition_3 = document.getElementById('definition_3');
const section_1 = document.getElementById('section_1');
const section_2 = document.getElementById('section_2');
const section_3 = document.getElementById('section_3');
const antonyms = document.getElementById('antonyms');
const antonyms_2 = document.getElementById('antonyms_2');
const antonyms_3 = document.getElementById('antonyms_3');
const antonyms_4 = document.getElementById('antonyms_4');
const section_4 = document.getElementById('section_4');
const definition_4 = document.getElementById('definition_4');
const synoname_4 = document.getElementById('synoname_4');


let audioElement = null;
function wordresultsshow() {
    wordresultscontainer.style.display = 'block';
}
function wordresultshide() {
    wordresultscontainer.style.display = 'none';
}
function showLoading() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function hideLoading() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
    document.body.style.overflow = 'auto';
}

async function fetchDefinition() {
    const word = document.getElementById("wordInput").value.trim();
    if (!word) {
        showError('Please enter a word.');
        return;
    }

    // Reset UI
    resetUI();
    showLoading();

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Word not found or network issue.');
        }
        const data = await response.json();
     
        // Display results
        displayResults(data[0]);
        hideLoading();
        wordresultsshow()



    } catch (err) {
        console.error(err);
        wordresultshide()

        showError('Word not found. Please try another word.');
        
        hideLoading();
    }
}
wordresultshide();
function resetUI() {
    hideLoading();
    error.classList.add('hidden');
    name.innerText = '';
    synoname.innerText = '';
    definition.innerText = '';
    const audioButton = document.getElementById('audioButton');
    audioButton.style.display = 'none';
    audioButton.classList.remove('playing');
    if (audioElement) {
        audioElement.pause();
        audioElement = null;
    }
}

function showError(message) {
    error.classList.remove('hidden');
    error.innerText = message;
}

function createAudioElement(url) {
    if (audioElement) {
        audioElement.pause();
        audioElement = null;
    }

    audioElement = new Audio(url);
    audioElement.volume = 1;

    audioElement.addEventListener('ended', () => {
        audioButton.classList.remove('playing');
    });

    return audioElement;
}

function handleDataVisibility(element, hasData) {
    if (element) {
        element.style.display = hasData ? 'block' : 'none';
    }
}

function displayResults(data) {
    hideLoading();

    // Display word
    name.innerText = data.word;

    // Handle first meaning
    const hasFirstMeaning = data.meanings && data.meanings[0] && data.meanings[0].definitions;
    handleDataVisibility(definition, hasFirstMeaning);
    if (hasFirstMeaning) {
        const definitionText1 = data.meanings[0].definitions[0]?.definition || '';
        const definitionText2 = data.meanings[0].definitions[1]?.definition || '';
        if (definitionText1 || definitionText2) {
            definition.innerHTML = `
            <div>
               <span class="font-medium text-gray-700"> Definition: </span>
            </div>
            <div class="mt-2">
                ${definitionText1 ? `<span class="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                ${definitionText1}
                </span><br>` : ''}
                ${definitionText2 ? `<span class="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                ${definitionText2}
                </span>` : ''}
            </div>
            `;
        }
    }

    // Handle second meaning
    const hasSecondMeaning = data.meanings && data.meanings[1] && data.meanings[1].definitions;
    handleDataVisibility(definition_2, hasSecondMeaning);
    if (hasSecondMeaning) {
        const definitionText1 = data.meanings[1].definitions[0]?.definition || '';
        const definitionText2 = data.meanings[1].definitions[1]?.definition || '';
        if (definitionText1 || definitionText2) {
            definition_2.innerHTML = `
            <div>
               <span class="font-medium text-gray-700"> Definition: </span>
            </div>
            <div class="mt-2">
            <span class="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                ${definitionText1 || ''}
            </span><br>
                <span class="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  ${definitionText2 || ''}
                </span>
               
            </div>
            `;
        }
    }

    // Handle first meaning synonyms
    const hasFirstSynonyms = data.meanings && data.meanings[0] && data.meanings[0].synonyms && data.meanings[0].synonyms.length > 0;
    handleDataVisibility(synoname, hasFirstSynonyms);
    if (hasFirstSynonyms) {
        const synonyms = data.meanings[0].synonyms.map(synonym =>
            `<span class="synonym-tag">${synonym}</span>`
        ).join('');
        synoname.innerHTML = `
            <div class="mb-4">
                <span class="font-semibold text-lg text-gray-700 font-medium">Synonyms:</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${synonyms}
            </div>
        `;
    }

    // Handle second meaning synonyms
    const hasSecondSynonyms = data.meanings && data.meanings[1] && data.meanings[1].synonyms && data.meanings[1].synonyms.length > 0;
    handleDataVisibility(synoname_2, hasSecondSynonyms);
    if (hasSecondSynonyms) {
        const synonyms_1 = data.meanings[1].synonyms.map(synonym =>
            `<span class="synonym-tag">${synonym}</span>`
        ).join('');
        synoname_2.innerHTML = `
            <div class="mb-4">
                <span class="font-semibold text-lg text-gray-700 font-medium">Synonyms:</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${synonyms_1}
            </div>
        `;
    }
    if (data.meanings && data.meanings[0] && data.meanings[0].antonyms && data.meanings[0].antonyms.length > 0) {
        const antonyms = data.meanings[0].antonyms.map(antonym =>
            `<span class="Antonyms-tag">${antonym}</span>`
        ).join('');
        antonyms.innerHTML = `
            <div class="mb-4">
                <span class="font-semibold text-lg text-gray-700 font-medium">Antonyms:</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${antonyms}
            </div>
        `;
    }

    
    if (data.meanings && data.meanings[1] && data.meanings[1].antonyms && data.meanings[1].antonyms.length > 0) {
        const antonyms = data.meanings[1].antonyms.map(antonym =>
            `<span class="Antonyms-tag">${antonym}</span>`
        ).join('');
        antonyms_2.innerHTML = `
            <div class="mb-4">
                <span class="font-semibold text-lg text-gray-700 font-medium">Antonyms:</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${antonyms}
            </div>
        `;
    }

   

    if (data.meanings && data.meanings[2] && data.meanings[2].antonyms && data.meanings[2].antonyms.length > 0) {
        const antonyms = data.meanings[2].antonyms.map(antonym =>
            `<span class="Antonyms-tag">${antonym}</span>`
        ).join('');
        antonyms_3.innerHTML = `
            <div class="mb-4">
                <span class="font-semibold text-lg text-gray-700 font-medium">Antonyms:</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${antonyms}
            </div>
        `;
    }

   
    if (data.meanings && data.meanings[3] && data.meanings[3].antonyms && data.meanings[3].antonyms.length > 0) {
        const antonyms = data.meanings[3].antonyms.map(antonym =>
            `<span class="Antonyms-tag">${antonym}</span>`
        ).join('');
        antonyms_4.innerHTML = `
             <div class="mb-4">
                 <span class="font-semibold text-lg text-gray-700 font-medium">Antonyms:</span>
             </div>
             <div class="flex flex-wrap gap-2">
                 ${antonyms}
             </div>
         `;
    }

    

    // Handle audio
    const audioButton = document.getElementById('audioButton');
    const hasAudio = data.phonetics && data.phonetics.length > 0 && data.phonetics.find(phonetic => phonetic.audio)?.audio;
    handleDataVisibility(audioButton, hasAudio);
    if (hasAudio) {
        const audioUrl = data.phonetics.find(phonetic => phonetic.audio)?.audio;
        audioButton.onclick = () => {
            if (!audioElement) {
                audioElement = createAudioElement(audioUrl);
            }

            if (audioElement.paused) {
                audioElement.play();
                audioButton.classList.add('playing');
            } else {
                audioElement.pause();
                audioButton.classList.remove('playing');
            }
        };
    }

    // Handle first meaning part of speech
    const hasFirstPartOfSpeech = data.meanings && data.meanings[0] && data.meanings[0].partOfSpeech;
    handleDataVisibility(partOfSpeech, hasFirstPartOfSpeech,);
    if (hasFirstPartOfSpeech) {
        section_1.style.display = 'block';
        const partOfSpeechs = data.meanings[0].partOfSpeech;
        const word = data.word;
        partOfSpeech.innerHTML = ` <div class="mb-4">
                <span class=" text-lg text-gray-700 font-medium">Part of Speech of <span class="boxes  text-[#c56cf0]" >${word}</span></span>
            </div>
            <div class="flex flex-wrap gap-2">
                <span class="transition-all duration-300 ease-in-out scale-105 shadow-md bg-gray-100 rounded-lg px-3 py-1 hover:text-black hover:scale-110 ">
                    ${partOfSpeechs}
                </span>
            </div>`;
    } else {
        section_1.style.display = 'none';
    }

    // Handle second meaning part of speech
    const hasSecondPartOfSpeech = data.meanings && data.meanings[1] && data.meanings[1].partOfSpeech;
    handleDataVisibility(partOfSpeech, hasFirstPartOfSpeech, () => {
        if (!hasFirstPartOfSpeech) {
            section_2.style.border = '2px solid red';
        }
    });
    if (hasSecondPartOfSpeech) {
        section_2.style.display = 'block';
        const partOfSpeechs_2 = data.meanings[1].partOfSpeech;
        const word = data.word;
        partOfSpeech_2.innerHTML = ` <div class="mb-4">
               <span class=" text-lg text-gray-700 font-medium">Part of Speech of <span class="boxes  text-[#c56cf0]"  >${word}</span></span>
            </div>
            <div class="flex flex-wrap gap-2">
                <span id="helo" class="transition-all duration-300 ease-in-out scale-105 shadow-md bg-gray-100 rounded-lg px-3 py-1 hover:text-black hover:scale-110 ">
                    ${partOfSpeechs_2}
                </span>
            </div>`;




    } else {
        section_2.style.display = 'none';
    }

    // Handle third meaning part of speech
    const hasThirdPartOfSpeech = data.meanings && data.meanings[2] && data.meanings[2].partOfSpeech;
    handleDataVisibility(partOfSpeech_3, hasThirdPartOfSpeech);
    if (hasThirdPartOfSpeech) {
        section_3.style.display = 'block';
        const partOfSpeechs_3 = data.meanings[2].partOfSpeech;
        const word = data.word;
        partOfSpeech_3.innerHTML = ` <div class="mb-4">
               <span class=" text-lg text-gray-700 font-medium">Part of Speech of <span class="boxes  text-[#c56cf0]" >${word}</span></span>
            </div>
            <div class="flex flex-wrap gap-2">
                <span class="transition-all duration-300 ease-in-out scale-105 shadow-md bg-gray-100 rounded-lg px-3 py-1 hover:text-black hover:scale-110 ">
                    ${partOfSpeechs_3}
                </span>
            </div>`;
    }
    else {
        section_3.style.display = 'none';
    }

    
    if (data.meanings && data.meanings[3] && data.meanings[3].partOfSpeech) {
        section_4.style.display = 'block';
        const partOfSpeechs_3 = data.meanings[3].partOfSpeech;
        const word = data.word;
        partOfSpeech_4.innerHTML = ` <div class="mb-4">
               <span class=" text-lg text-gray-700 font-medium">Part of Speech of <span class="boxes  text-[#c56cf0]" >${word}</span></span>
            </div>
            <div class="flex flex-wrap gap-2">
                <span class="transition-all duration-300 ease-in-out scale-105 shadow-md bg-gray-100 rounded-lg px-3 py-1 hover:text-black hover:scale-110 ">
                    ${partOfSpeechs_3}
                </span>
            </div>`;
    }
    else {
        section_4.style.display = 'none';
    }
    // Handle third meaning synonyms
    const hasThirdSynonyms = data.meanings && data.meanings[2] && data.meanings[2].synonyms && data.meanings[2].synonyms.length > 0;
    handleDataVisibility(synoname_3, hasThirdSynonyms);
    if (hasThirdSynonyms) {

        const synonyms_3 = data.meanings[2].synonyms.map(synonym =>
            `<span class="synonym-tag">${synonym}</span>`
        ).join('');
        synoname_3.innerHTML = `
            <div class="mb-4">
                <span class="font-semibold text-lg text-gray-700 font-medium">Synonyms:</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${synonyms_3}
            </div>
        `;
    }
    if (data.meanings && data.meanings[3] && data.meanings[3].synonyms && data.meanings[3].synonyms.length > 0) {
        const synonyms_3 = data.meanings[3].synonyms.map(synonym =>
            `<span class="synonym-tag">${synonym}</span>`
        ).join('');
        synoname_4.innerHTML = `
            <div class="mb-4">
                <span class="font-semibold text-lg text-gray-700 font-medium">Synonyms:</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${synonyms_3}
            </div>
        `;
    }

    const hasthirddefine = data.meanings && data.meanings[2] && data.meanings[2].definitions;
    handleDataVisibility(definition_2, hasthirddefine);
    if (hasthirddefine) {
        const definitionText1 = data.meanings[2].definitions[0]?.definition || '';
        const definitionText2 = data.meanings[2].definitions[1]?.definition || '';
        if (definitionText1 || definitionText2) {
            definition_3.innerHTML = `
            <div>
               <span class="font-medium text-gray-700"> Definition: </span>
            </div>
            <div class="mt-2">
            <span class="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                ${definitionText1 || ''}
            </span><br>
                <span class="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  ${definitionText2 || ''}
                </span>
               
            </div>
            `;
        }
    }
    if (data.meanings && data.meanings[3] && data.meanings[3].definitions) {
        const definitionText1 = data.meanings[3].definitions[0]?.definition || '';
        const definitionText2 = data.meanings[3].definitions[1]?.definition || '';
        if (definitionText1 || definitionText2) {
            definition_4.innerHTML = `
            <div>
               <span class="font-medium text-gray-700"> Definition: </span>
            </div>
            <div class="mt-2">
            <span class="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                ${definitionText1 || ''}
            </span><br>
                <span class="hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  ${definitionText2 || ''}
                </span>
               
            </div>
            `;
        }
    }

    // Handle fourth meaning synonyms
    const hasFourthSynonyms = data.meanings && data.meanings[3] && data.meanings[3].synonyms && data.meanings[3].synonyms.length > 0;
    handleDataVisibility(synoname_4, hasFourthSynonyms);
    if (hasFourthSynonyms) {
        const synonyms_3 = data.meanings[3].synonyms.map(synonym =>
            `<span class="synonym-tag">${synonym}</span>`
        ).join('');
        synoname_4.innerHTML = `
            <div class="mb-4">
                <span class="font-semibold text-lg text-gray-700 font-medium">Synonyms:</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${synonyms_3}
            </div>
        `;
    }

}

// Add enter key support
document.getElementById('wordInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchDefinition();
    }
});