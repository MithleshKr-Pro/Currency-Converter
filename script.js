const input = document.getElementById("input");
const inpCurrency = document.getElementById("currencyFrom");
const outCurrency = document.getElementById("currencyTo");
const convert = document.getElementById("convert");

const heroSec = document.querySelector(".container");
let elem = document.createElement("div");

let baseCurrency = inpCurrency.value.toLowerCase();
let reqCurrency = outCurrency.value.toLowerCase();

// const URL =
//   "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_08IqRjpa9ocKDKbFzaWiG2aGxPe5GBDSEh6H3k6e";
// const URL = "https://api.exchangerate-api.com/v4/latest/${inpCurrency.value}";
// const URL = "https://currency-rate-exchange-api.onrender.com/${baseCurrency}";

let currencySym = "",
  currencySym2 = "";
let flagImg = "",
  flagImg2 = "";

const exchangeRate = async () => {
  try {
    if (baseCurrency != reqCurrency) {
      const response = await fetch(
        `https://currency-rate-exchange-api.onrender.com/${baseCurrency}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      console.log("Base Currency :", baseCurrency);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      let inr = data.rates[`${baseCurrency}`];
      currencySym = data.currencySymbol;
      flagImg = data.flagImage;


      // console.log(currencySym);

      const response2 = await fetch(
        `https://currency-rate-exchange-api.onrender.com/${reqCurrency}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log("Required Currency :", reqCurrency);

      if (!response2.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data2 = await response2.json();
      const inr2 = data2.rates[`${reqCurrency}`];
      currencySym2 = data2.currencySymbol;
      flagImg2 = data2.flagImage;

    //   inpCurrency.innerHTML = `<option value="">Select to convert</option>`;
    //   outCurrency.innerHTML = `<option value="">Select to convert from</option>`;
    //   inr.forEach((item) => {
    //     const option = document.querySelectorAll("option");
    //     option.value=inr[item];
    //     inpCurrency.appendChild(option);

    //   });

      // console.log(currencySym2);

      // inpCurrency.value="";
      // outCurrency.value="";

      return inr[`${reqCurrency}`];
    } else {
      alert("Please select different currencies");
    }
  } catch (error) {
    console.log("Error !! ", error);
    alert("Error !!");
  }
};

convert.addEventListener("click", async () => {
  reqCurrency = outCurrency.value.toLowerCase();
  baseCurrency = inpCurrency.value.toLowerCase();
  if (!isNaN(input.value)) {
    const Rate = await exchangeRate();
    // const rates=Rate[outCurrency.value];
    let ans = parseFloat(input.value) * Rate;

    elem.innerHTML = `
    <div style="display: flex; align-content:center; flex-wrap:wrap;">
        <div style="display: flex; align-content: space-around;width: fit-content; text-align: center">
        <img id = "flagImg" src ="${flagImg}" alt="${currencySym}" >
        <span style="align-self:center;align-content: center;text-align: center"> TO </span>
        <img id = "flagImg2" src="${flagImg2}" alt="${currencySym2}" >
        </div>
        <div style="display: flex; align-self:center">
        <h1> ${currencySym} 1 =  ${currencySym2}  ${Rate.toFixed(3)} </h1>
        <br>
        Exchange Rate : ${Rate.toFixed(3)}
        <br>
        Input Amount : ${currencySym} ${input.value}
        <br> 
        Output Amount : ${currencySym2} ${ans.toFixed(3)} 
        </div>
    </div>  
    `;

    document.getElementById("fromImg").src = flagImg;
    document.getElementById("toImg").src = flagImg2;

    // inpCurrency.reset();
    // outCurrency.reset();

    console.log(currencySym);
    console.log(currencySym2);

    elem.classList.add("AnsList");
    heroSec.appendChild(elem);
  } else {
    alert("Please Enter Numbers Only !!");
  }
});
