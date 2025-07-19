const longUrlInput = document.getElementById('longUrlInput');
const shortenBtn = document.getElementById('shortenBtn');
const resultArea = document.getElementById('resultArea');

shortenBtn.addEventListener('click', async()=>{
    const urlToShorten = longUrlInput.value;

    try{
        const response = await fetch('http://localhost:3000/shorten', {
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ longURL: urlToShorten }),
        });
        
    
    if(!response.ok){
            throw new Error('Network response was not ok');

        }
         const data = await response.json();

    resultArea.textContent = `Shortened URL: ${data.shortURL}`;
    }
    catch (error) {
   
    console.error('There was a problem with the fetch operation:', error);
    resultArea.textContent = 'Error: Could not shorten URL.';
  }
   
    
})