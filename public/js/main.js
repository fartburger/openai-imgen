function onSubmit(e) {
    e.preventDefault();

    document.querySelector('#image1').src = '';

    const prompt = document.querySelector("#prompt").value
    
    if(prompt === '') {
        alert('Enter a prompt');
        return;
    }

    console.log('success');

    generateImageRequest(prompt);
}

async function generateImageRequest(prompt) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt
            })
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error('Something went wrong.');
        }

        const data = await response.json();
        const imageUrls = data.data;
        console.log(imageUrls);

        document.querySelector('#image1').src= imageUrls[0].url;

        removeSpinner();
    } catch (e) {

    }
}

function showSpinner() {
    document.querySelector('.sk-cube-grid').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.sk-cube-grid').classList.remove('show');

}

document.querySelector('#image-form').addEventListener('submit', onSubmit);