import "./global.css";
import styles from "./App.module.css";

import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { useState } from "react";

function App() {
  const [damageInfo, setDamageInfo] = useState({
    totalPE: 0,
    totalThreat: 0,
    totalDiceAmmount: 0,
    diceType: 0,
    bonusDamage: 0,
    strikes: {},
  });

  return (
    <div className={styles.wrapper}>
      <Sidebar setDamageInfo={setDamageInfo} />
      <MainContent damageInfo={damageInfo} />
    </div>
  );
}

export default App;
