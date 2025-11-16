const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('result');

function searchRecommendation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    resultDiv.innerHTML = '';
    let beaches, temples, countries;
    let inputSubstr = input.substring(0,5);
    console.log(inputSubstr);

    if (input.length >= 5) {   
        fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            switch (inputSubstr) {
                case "beach":
                    for (i=1;i<3;i++){
                        beaches = data.beaches.find(item => item.id === i);
                        resultDiv.innerHTML += `<p><img src="${beaches.imageUrl}" width=280px height=180px alt="beaches ${i}"><p>`;
                        resultDiv.innerHTML += `<p><strong>${beaches.name}</strong><p>`;
                        resultDiv.innerHTML += `<p>${beaches.description}<p>`;
                        resultDiv.innerHTML += `<p><button id='btnVisit' class="btn" > Visit </button><p>`;
                    }                    
                    break;
                case "templ":
                    for (i=1;i<3;i++){
                        temples = data.temples.find(item => item.id === i);
                        resultDiv.innerHTML += `<p><img src="${temples.imageUrl}" width=280px height=180px alt="beaches ${i}"><p>`;
                        resultDiv.innerHTML += `<p><strong>${temples.name}</strong><p>`;
                        resultDiv.innerHTML += `<p>${temples.description}<p>`;
                        resultDiv.innerHTML += `<p><button id='btnVisit' class="btn" > Visit </button><p>`;
                    }    
                    break;
                case "count":
                    const imageUrls = [] , cityNames = [] , cityDescriptions = [];

                    for (const country of data.countries){
                        for (const city of country.cities) {
                            imageUrls.push(city.imageUrl);
                            cityNames.push(city.name);
                            cityDescriptions.push(city.description);
                        }
                    }
                    for (i=0;i<cityNames.length;i++){
                        resultDiv.innerHTML += `<p><img src="${imageUrls[i]}" width=280px height=180px alt="city ${i}"><p>`;
                        resultDiv.innerHTML += `<p><strong>${cityNames[i]}</strong><p>`;
                        resultDiv.innerHTML += `<p>${cityDescriptions[i]}<p>`;
                        resultDiv.innerHTML += `<p><button id='btnVisit' class="btn" > Visit </button><p>`;
                    }    
                    break;
                default:
                    alert("${input.substring(0,4)} Please enter beach, temple, or country into the Search Box")
            }
        console.log(data.temples);

        })
        .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
    } else {
        alert("Please enter beach, temple, or country into the Search Box")
    }
}
function clearResult() {
    resultDiv.innerHTML = '';
    searchInput.value = '';
}
btnSearch.addEventListener('click', searchRecommendation);
btnClear.addEventListener('click', clearResult);
