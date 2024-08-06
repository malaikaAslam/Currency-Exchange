let api_url=" https://v6.exchangerate-api.com/v6/e74b04de0e07520dfbac4d0f";
let drp_btns=document.querySelectorAll(".dropdown select");
let val=document.querySelectorAll(".amount");
const btnn=document.querySelector(".ex-btn");
const msg=document.querySelector(".msg1");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".To select");


     document.querySelectorAll(".dropdown").forEach(select => {
        select.addEventListener("change", (event) => {
            flagChange(event.target);
        });
    });

    window.addEventListener("load",()=>{
        exchangeRate();
    })


for(let select of drp_btns){
    for(code in countryList){
    let newOption= document.createElement("option");
     newOption.innerText=code;
     newOption.value=code;
     if(select.name==="from" && code==="USD"){
        newOption.selected="selected";
     }
     else if(select.name==="To" && code==="AED"){
     newOption.selected="selected";
     }
     select.append(newOption);


     
   }
}
const flagChange=(element)=>{
     let  code=element.value;
     let countryCode=countryList[code];
     let new_src=`https://flagsapi.com/${countryCode}/flat/64.png`;
     let img= element.parentElement.querySelector("img");
     img.src=new_src;
};

btnn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount= document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1 ){
        amtVal=1;
        amount.value="1";
    }
   await exchangeRate(amtVal, fromCurr.value, toCurr.value);
   
});

const exchangeRate = async (amount, from, to) => {
    try {
        let response = await fetch(`${api_url}/latest/${from}`);
        let data = await response.json();
        if (data.result === "success") {
            let rate = data.conversion_rates[to];
            let exchangedAmount = (amount * rate);
            msg.innerText = `${amount} ${from} = ${exchangedAmount} ${to}`;
            if (isNaN(rate)) {
                msg.innerText = `Exchange rate not available for ${to}`;
            } else {
                let exchangedAmount = (amount * rate).toFixed(2);
                msg.innerText = `${amount} ${from} = ${exchangedAmount} ${to}`;
            }
        } 
        else {
            console.error("API Error: ", data.error);
        }
    } catch (error) {
        console.error("Error fetching exchange rate: ", error);
    }
};