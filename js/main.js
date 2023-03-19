{
  const preventInvalidCharacters = (e, amount) => {
    const invalidCharacters = ["-", "+", "e"];
    const maxValue = 999999999999;

    if (
      invalidCharacters.includes(e.key) ||
      amount * 10 + e.key * 1 > maxValue ||
      (amount * 1 === maxValue && (e.key === "." || e.key === ","))
    )
      e.preventDefault();
  };

  const removeErrorState = (amountElement) => {
    if (amountElement.value !== "")
      amountElement.classList.remove("form__field--error");
  };

  const setErrorState = (amountElement, resultElement) => {
    amountElement.classList.add("form__field--error");
    resultElement.classList.add("result--hidden");
  };

  const handleConversion = (e, amountElement, resultElement) => {
    e.preventDefault();

    const amount = amountElement.value;

    if (amount === "") {
      setErrorState(amountElement, resultElement);
      return;
    }

    convertCurrencies(resultElement, amount);
  };

  const getResult = (currency, convertedCurrency, amount) => {
    const currencies = {
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
      (amount * currencies[currency]) /
      currencies[convertedCurrency]
    ).toFixed(2);
  };

  const convertCurrencies = (resultElement, amount) => {
    const currency = document.querySelector(".js-currency").value;
    const convertedCurrency = document.querySelector(
      ".js-convertedCurrency"
    ).value;
    const result = getResult(currency, convertedCurrency, amount);

    resultElement.innerText = `Przeliczona wartość wynosi: ${result} ${convertedCurrency}`;
    resultElement.classList.remove("result--hidden");
  };

  const resetForm = (amountElement, resultElement) => {
    amountElement.classList.remove("form__field--error");
    resultElement.classList.add("result--hidden");
  };

  const init = () => {
    const amountElement = document.querySelector(".js-amount");
    const convertElement = document.querySelector(".js-convert");
    const resultElement = document.querySelector(".js-result");
    const resetElement = document.querySelector(".js-reset");

    amountElement.addEventListener("keydown", (e) => {
      preventInvalidCharacters(e, amountElement.value);
    });
    amountElement.addEventListener("input", () => {
      removeErrorState(amountElement);
    });
    convertElement.addEventListener("click", (e) => {
      handleConversion(e, amountElement, resultElement);
    });
    resetElement.addEventListener("click", () => {
      resetForm(amountElement, resultElement);
    });
  };

  init();
}
