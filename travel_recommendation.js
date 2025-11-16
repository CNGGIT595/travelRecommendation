const btnSearch = document.getElementById('btnSearch');

function searchRecommendation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    let beaches;
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
                        resultDiv.innerHTML += `<img src="${beaches.imageUrl}" alt="beaches 1">`;
                    }
                    
                    break;
                case "templ":
                    resultDiv.innerHTML += `<img src="${data.temples[0].imageUrl} alt="temple 1">`;
                    break;
                case "count":
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
btnSearch.addEventListener('click', searchRecommendation);
