import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [haveMoney, setHaveMoney] = useState(0);
  const onSubmit = (event) => {
    const moneyInput = document.querySelector("#insertMn");
    event.preventDefault();
    setHaveMoney(moneyInput.value);
    moneyInput.value = null;

  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [haveMoney]);

  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
        <div>You have {haveMoney}$</div>
        <input id="insertMn" type="number" placeholder="Insert your have money"></input>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select>
            {coins.map((coin, index) => (
              // haveMoney가 coin의 가격보다 큰 경우에만 옵션을 출력
              haveMoney >= coin.quotes.USD.price && (
                <option key={index}>
                  {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
                </option>
              )
            ))}
          </select>
        )}
      </form>
    </div>
  );
}

export default App;
