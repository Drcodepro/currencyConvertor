let BaseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


let dropdowns = document.querySelectorAll("select");
let btn = document.querySelector("button");
let MSG = document.querySelector("#ans");
let fromCurr = document.querySelector("#from select");
let toCurr = document.querySelector("#to select");


//  added country currency name in the dropdown

for(let select of dropdowns){
    for(code in countryList){
       let newoption = document.createElement("option");
       newoption.innerText = code;
       newoption.value=code;
       select.append(newoption);
    
        
       // set the default country code value in the dropdown

       if( select.id==="FROM" && code==="USD"){
        newoption.selected="selected"
       }
       if( select.id==="TO" && code==="INR"){
        newoption.selected="selected"
       }
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}


// CHANGING THE FLAG ACCORDING TO THE SELECTED COUNTRY CURRNECY
 function updateFlag(element){
    let currencycode = element.value;
    let countryCode = countryList[currencycode];

// CHANGING THE URL OF FLAG INSIDE THE IMG TAG SRC

    let newFlag =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newFlag;
 }

 // calculate the exchange values 

 
 btn.addEventListener("click", async(event)=>{
 event.preventDefault();
 let input = document.querySelector("input") 
 let inputAmount = input.value;

 if(inputAmount<=0 || isNaN(inputAmount)){
    inputAmount =0;
    input.value="0"
    alert("Enter valid amount")
 } 
 
 let URL = `${BaseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

let response = await fetch(URL);
let data = await response.json();

let rate = data[toCurr.value.toLowerCase()];
let finalamount =  inputAmount * rate;

// update msg
MSG.innerHTML = `${inputAmount} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;

})