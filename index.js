let selectedImage = document.getElementById('selectedImage');
let imageUpload = document.getElementById('imageUpload');
let generateCaption = document.getElementById('generateCaption');
let captionResult = document.getElementById('captionResult');
let model;

async function loadModel() {
    captionResult.textContent = "Loading model...";
    model = await mobilenet.load();
    captionResult.textContent = "Model loaded successfully.";
}

imageUpload.addEventListener('change', (event) => {
    let reader = new FileReader();
    reader.onload = function() {
        selectedImage.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
});

generateCaption.addEventListener('click', async () => {
    if (!model) {
        captionResult.textContent = "Model not loaded.";
        return;
    }
    const predictions = await model.classify(selectedImage);
    captionResult.innerHTML = 'Caption:';
    predictions.forEach((prediction) => {
        const p = document.createElement('p');
        p.innerText = `${prediction.className}: ${(prediction.probability * 100).toFixed(2)}%`;
        captionResult.appendChild(p);
    });
});

loadModel();
