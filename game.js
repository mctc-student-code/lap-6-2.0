let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let againButton =document.querySelector("#again")
let clearButton = document.querySelector("#clear")

// TODO finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file, o
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 
console.log(randomCountryElement);


///console.log(countriesAndCodes[randomCountry]);
let url
// TODO when the page loads, select an element at random from the countriesAndCodes array
randomCountry()
function randomCountry() {
    let randomPick = Math.floor(Math.random()* countriesAndCodes.length)
    let randomCountry = countriesAndCodes[randomPick]
    randomCountryElement.innerHTML = randomCountry.name
    let countryCode = randomCountry['alpha-2']   // randomCountry is an object, get the alpha-2 code from that object
    url =`https://api.worldbank.org/v2/country/${countryCode}?format=json`
    
}




// TODO display the country's name in the randomCountryElement 










// TODO add a click event handler to the submitButton.  When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimume, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"
submitButton.addEventListener("click", function(){
    answer()
})

// answer()   // don't call this yet
function answer(){
   
    let useranswerCh = userAnswerElement.value
   fetch(url)
    .then( response => response.json())
    .then( countries => {
        console.log(countries)
        let city = countries[1][0].capitalCity
        if (city.toLowerCase() == useranswerCh.toLowerCase()){  //Lowercase both strings for comparing. Otherwise you'll compare 'berlin' and 'Berlin'
            resultTextElement.innerHTML = ` Correct!! the capita city of   ${randomCountry.name}  is ${useranswerCh}`
            
        } else {
            resultTextElement.innerHTML = `Incorrect, the capital city of ${randomCountry.name} is not ${useranswerCh}, 
            it is ${city}`
        }
})
   .catch( error => {
        console.log(error)
    }) ;

}
 
   
   


// TODO finally, connect the play again button. Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. If you didn't use functions in the code you've 
// already written, you should refactor your code to use functions to avoid writing very similar code twice.



clearButton.addEventListener('click', function(){
    resultTextElement.innerHTML=''
    userAnswerElement.value= ''
})

againButton.addEventListener('click', function(){
    randomCountry()
    resultTextElement.innerHTML=''
    userAnswerElement.value =''
})
