import React, { useState } from "react";
import Layout from "./layout/Layout";
import Profile from "./views/Profile";
import Market from "./views/Market";
function App() {
  const [market, setMarket] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          {!market && <Profile setMarket={setMarket} />}
          {market && <Market />}
        </Layout>
      </header>
    </div>
  );
}

export default App;
