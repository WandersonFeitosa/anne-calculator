import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

import styles from "./Sidebar.module.css";

interface SidebarProps {
  setDamageInfo: Function;
}

export function Sidebar({ setDamageInfo }: SidebarProps) {
  const [data, setData] = useState({
    nex: "60",
    diceAmmount: "1",
    weaponDamage: "16",
    crit: "3",
    threat: "20",
    destroyPrey: "",
    heavyStrike: "",
    atrociusWeapon: "",
    threatExecute: "",
    slaughtPrey: "",
  });
  const [disabledDestroyPrey, setDisabledDestroyPrey] = useState(false);
  const [checkedDestroyPrey, setCheckedDestroyPrey] = useState<boolean>();

  // Limpa os valores do Destruir Presa caso o NEX do personagem seja menor que 25%

  function clearDestroyPrey() {
    const newData = { ...data, destroyPrey: "" };
    setData(newData);
    if (disabledDestroyPrey == true) {
      setCheckedDestroyPrey(false);
    } else {
      setCheckedDestroyPrey(undefined);
    }
  }

  useEffect(() => {
    if (Number(data.nex) < 25) {
      setDisabledDestroyPrey(true);
      clearDestroyPrey();
    } else {
      setDisabledDestroyPrey(false);
    }
  }, [data.nex]);

  //---------------------------------------------------------------
  //Eventos de mudança do formulário

  function handleNotCheckboxChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const newData = { ...data, [inputName]: inputValue };
    setData(newData);
  }

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputValue == "checked") {
      const newData = { ...data, [inputName]: "" };
      setData(newData);
    } else {
      const newData = { ...data, [inputName]: "checked" };
      setData(newData);
    }
  }
  //---------------------------------------------------------------
  // Realiza o cálculo dos dados que devem ser jogados
  function handleCalculateInfo(event: any) {
    event.preventDefault();

    let totalPE = 0;
    let totalDiceAmmount = Number(data.diceAmmount) + 1;
    let totalCrit = Number(data.crit);
    let totalThreat = Number(data.threat);
    let diceType = data.weaponDamage;

    //Adições que serão feitas de acordo com as opções Marcadas
    function addPE(value: number) {
      totalPE += value;
    }
    function addDice(value: number) {
      totalDiceAmmount += value;
    }
    function addCrit(value: number) {
      totalCrit += value;
    }
    function addThreat(value: number) {
      totalThreat -= value;
    }

    //---------------------------------------------------------------
    //Contadores manuais que eu tenho que descobrir como automatizar depois
    function countThreatPerPE() {
      const threatExecute = Number(data.threatExecute);
      if (threatExecute == 2) {
        addThreat(2);
        addPE(2);
      }
      if (threatExecute == 4) {
        addThreat(4);
        addPE(6);
      }
      if (threatExecute == 6) {
        addThreat(6);
        addPE(12);
      }
      if (threatExecute == 8) {
        addThreat(8);
        addPE(20);
      }
    }

    function countDicePerNEX() {
      const nex = Number(data.nex);
      if (nex >= 25 && nex < 40) {
        addDice(1);
      }
      if (nex >= 40 && nex < 65) {
        addDice(2);
      }
      if (nex >= 65 && nex < 99) {
        addDice(3);
      }
      if (nex >= 99) {
        addDice(4);
      }
    }

    function countCritPerPE() {
      const slaughtPrey = Number(data.slaughtPrey);
      if (slaughtPrey == 1) {
        addCrit(1);
        addPE(2);
      }
      if (slaughtPrey == 2) {
        addCrit(2);
        addPE(6);
      }
      if (slaughtPrey == 3) {
        addCrit(3);
        addPE(12);
      }
      if (slaughtPrey == 4) {
        addCrit(4);
        addPE(20);
      }
    }
    //---------------------------------------------------------------

    // GOLPE PESADO
    if (data.heavyStrike == "checked") {
      addDice(1);
    }
    //DESTRUIR PRESA
    if (data.destroyPrey == "checked") {
      countDicePerNEX();
    }
    //ARMA ATROZ
    if (data.atrociusWeapon == "standard") {
      addThreat(1);
    }
    if (data.atrociusWeapon == "trueForm") {
      addCrit(2);
      addThreat(2);
    }
    // EXECUTAR PRESA
    if (data.threatExecute) {
      countThreatPerPE();
    }
    // MASSACRAR PRESA
    if (data.slaughtPrey) {
      countCritPerPE();
    }

    const damageInfo = {
      totalDiceAmmount,
      totalPE,
      totalCrit,
      totalThreat,
      diceType,
    };

    setDamageInfo(damageInfo);
  }

  return (
    <div className={styles.sidebarWrapper}>
      <div>
        <aside className={styles.aside}>
          <div className={styles.title}>Calculadora</div>
          <form onSubmit={handleCalculateInfo}>
            <div className={styles.inputLine}>
              <div className={styles.labelInput}> NEX </div>
              <input
                className={styles.longInput}
                name="nex"
                type="text"
                onChange={handleNotCheckboxChange}
                value={data.nex}
              />
            </div>

            <div className={styles.inputLine}>
              <div className={styles.labelInput}>Dano base da arma:</div>
              <input
                className={styles.diceInput}
                name="diceAmmount"
                type="number"
                onChange={handleNotCheckboxChange}
                value={data.diceAmmount}
              />
              D
              <input
                className={styles.diceInput}
                name="weaponDamage"
                type="text"
                onChange={handleNotCheckboxChange}
                value={data.weaponDamage}
              />
            </div>
            <div className={styles.inputLine}>
              <div className={styles.labelInput}> Crit base da arma: </div>
              <input
                className={styles.longInput}
                name="crit"
                type="text"
                onChange={handleNotCheckboxChange}
                value={data.crit}
              />
            </div>
            <div className={styles.inputLine}>
              <div className={styles.labelInput}> Ameaça base: </div>
              <input
                className={styles.longInput}
                name="threat"
                type="text"
                onChange={handleNotCheckboxChange}
                value={data.threat}
              />
            </div>
            <div className={styles.inputLine}>
              <div className={styles.labelInput}> Golpe Pesado: </div>
              <input
                type="Checkbox"
                name="heavyStrike"
                onChange={handleCheckboxChange}
                value={data.heavyStrike}
              />
            </div>
            <div className={styles.inputLine}>
              <div className={styles.labelInput}> Arma Atroz: </div>
              <select
                className={styles.longInput}
                name="atrociusWeapon"
                onChange={handleNotCheckboxChange}
                value={data.atrociusWeapon}
              >
                <option value="no">Não </option>
                <option value="standard">Padrão</option>
                <option value="trueForm">Verdadeiro</option>
              </select>
            </div>

            <div className={styles.inputLine}>
              <div className={styles.labelInput}> Desturir Presa: </div>

              <input
                type="Checkbox"
                name="destroyPrey"
                disabled={disabledDestroyPrey}
                checked={checkedDestroyPrey}
                onChange={handleCheckboxChange}
                value={data.destroyPrey}
              />
            </div>

            <div className={styles.inputLine}>
              <div className={styles.labelInput}>Executar Presa:</div>

              <select
                className={styles.longInput}
                name="threatExecute"
                onChange={handleNotCheckboxChange}
                value={data.threatExecute}
              >
                <option value="0">0</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </select>
            </div>

            <div className={styles.inputLine}>
              <div className={styles.labelInput}>Massacrar Presa:</div>

              <select
                className={styles.longInput}
                name="slaughtPrey"
                onChange={handleNotCheckboxChange}
                value={data.slaughtPrey}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <button type="submit"> Calcular</button>
          </form>
        </aside>
      </div>
    </div>
  );
}
