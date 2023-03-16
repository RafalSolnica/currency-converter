{
  const convertElement = document.querySelector(".js-convert");
  const amountElement = document.querySelector(".js-amount");
  const resultElement = document.querySelector(".js-result");
  const resetElement = document.querySelector(".js-reset");

  const preventInvalidCharacters = (e) => {
    const invalidCharacters = ["-", "+", "e"];
    const maxValue = 999999999999;

    if (invalidCharacters.includes(e.key)) e.preventDefault();

    if (
      amountElement.value * 10 + e.key * 1 > maxValue ||
      (amountElement.value * 1 === maxValue && (e.key === "." || e.key === ","))
    )
      e.preventDefault();
  };

  const setErrorState = () => {
    amountElement.classList.add("form__field--error");
    resultElement.classList.add("result--hidden");
  };

  const removeErrorState = () => {
    if (amountElement.value !== "")
      amountElement.classList.remove("form__field--error");
  };

  const handleConversion = (e) => {
    e.preventDefault();

    const amount = amountElement.value;
    if (amount === "") {
      setErrorState();
      return;
    }

    convertCurrencies(amount);

    if (resultElement.classList.contains("result--hidden"))
      resultElement.classList.toggle("result--hidden");
  };

  const convertCurrencies = (amount) => {
    const currency = document.querySelector(".js-currency").value;
    const convertedCurrency = document.querySelector(
      ".js-convertedCurrency"
    ).value;
    const result = calculateResult(currency, convertedCurrency, amount);

    resultElement.innerText = `Przeliczona wartość wynosi: ${result} ${convertedCurrency}`;
  };

  const calculateResult = (currency, convertedCurrency, amount) => {
    const valuesInPLN = {
      PLN: 1,
      USD: 4.42,
      EUR: 4.7,
      GBP: 5.33,
      CNY: 0.64,
      AUD: 2.94,
      CAD: 3.22,
      CHF: 4.78,
      JPY: 0.033,
    };

    return (
      (amount * valuesInPLN[currency]) /
      valuesInPLN[convertedCurrency]
    ).toFixed(2);
  };

  const resetForm = () => {
    amountElement.classList.remove("form__field--error");
    resultElement.classList.add("result--hidden");
  };

  amountElement.addEventListener("keydown", (e) => {
    preventInvalidCharacters(e);
  });
  amountElement.addEventListener("input", removeErrorState);
  convertElement.addEventListener("click", (e) => {
    handleConversion(e);
  });
  resetElement.addEventListener("click", resetForm);
}
