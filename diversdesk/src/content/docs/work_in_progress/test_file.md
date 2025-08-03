---
title: "Test File"
description: "This is a valid description for the test file."
date: "2024-09-17"
pagefind: false
robots: noindex, nofollow
---
<div class="container">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">One Tool to Rule Them All!</h1>
    <p class="text-lg text-gray-600 mb-8">See how Diversdesk replaces your fragmented tools.</p>

    <div id="image-container" class="flex justify-center items-center min-h-[300px]">
        <div id="loading-indicator" class="loading-spinner"></div>
        <img id="generated-image" src="" alt="Diversdesk consolidating multiple tools" class="hidden w-full h-auto rounded-lg shadow-md">
    </div>
</div>

<style>
    /* Your CSS from the head tag */
    body { /* Note: 'body' styles might need to be applied to a wrapper div or global CSS */
        font-family: 'Inter', sans-serif;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        overflow: hidden;
    }
    .container {
        max-width: 90%;
        width: 800px;
        background-color: #ffffff;
        border-radius: 1.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        text-align: center;
    }
    .loading-spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: #3b82f6;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 2rem auto;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<script>
    // Your JavaScript from the script tag
    document.addEventListener('DOMContentLoaded', () => { // Use DOMContentLoaded for Astro
        const imageContainer = document.getElementById('image-container');
        const loadingIndicator = document.getElementById('loading-indicator');
        const generatedImage = document.getElementById('generated-image');

        async function generateConsolidationImage() {
            loadingIndicator.classList.remove('hidden');
            generatedImage.classList.add('hidden');

            const userPrompt = "A sleek, modern digital interface representing 'Diversdesk' at the center. Around it, several smaller, older, and slightly faded icons representing 'Google Calendar', 'Google Sheets', 'Docusign', 'Generic Booking Software', and 'Generic Equipment Inventory Software' are being absorbed or replaced by lines flowing into the central Diversdesk interface. The overall theme should convey consolidation, efficiency, and modernity. Use a clean, professional aesthetic with a subtle glow around the central Diversdesk icon.";

            const payload = {
                instances: { prompt: userPrompt },
                parameters: { "sampleCount": 1 }
            };

            const apiKey = ""; // Canvas will automatically provide this
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

            let retries = 0;
            const maxRetries = 5;
            const initialDelay = 1000; // 1 second

            while (retries < maxRetries) {
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        if (response.status === 429) { // Too Many Requests
                            const delay = initialDelay * Math.pow(2, retries);
                            console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
                            await new Promise(resolve => setTimeout(resolve, delay));
                            retries++;
                            continue;
                        }
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();

                    if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
                        const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
                        generatedImage.src = imageUrl;
                        generatedImage.classList.remove('hidden');
                        loadingIndicator.classList.add('hidden');
                        break; // Exit loop on success
                    } else {
                        console.error('Image generation failed: No image data found in response.', result);
                        imageContainer.innerHTML = '<p class="text-red-500">Failed to generate image. Please try again.</p>';
                        loadingIndicator.classList.add('hidden');
                        break;
                    }
                } catch (error) {
                    console.error('Error generating image:', error);
                    imageContainer.innerHTML = '<p class="text-red-500">An error occurred while generating the image. Please try again.</p>';
                    loadingIndicator.classList.add('hidden');
                    break;
                }
            }
            if (retries === maxRetries) {
                console.error('Max retries reached. Image generation failed.');
                imageContainer.innerHTML = '<p class="text-red-500">Image generation failed after multiple retries. Please try again later.</p>';
                loadingIndicator.classList.add('hidden');
            }
        }

        generateConsolidationImage();
    });
</script>