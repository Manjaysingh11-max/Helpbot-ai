async function detectLanguage(text) {
    let response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=auto|en`);
    let data = await response.json();
    return data.responseData.detectedSourceLanguage || "en";
}
