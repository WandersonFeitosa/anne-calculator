import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

import styles from "./Sidebar.module.css";

interface SidebarProps {
  setDamageInfo: Function;
}

export function Sidebar({ setDamageInfo }: SidebarProps) {
  const [data, setData] = useState({
    diceAmmount: "3",
    weaponDamage: "12",
    threat: "20",
    bonusDamage: "0",
    strength: "3",
    ocultism: "15",
    bonusTest: "",
    ritualCircle: "",
    modificationPE: "",
    firstRitualCircle: "",
    firstModificationPE: "",
    secondRitualCircle: "",
    secondModificationPE: "",
    thirdRitualCircle: "",
    thirdModificationPE: "",
    reactiveBattle: "",
    sustainingRitual: "",
    sustainingBow: "",
    meAndShe: "",
    chrono: "",
    upgradedOcultism: "",
    timeSpurt: "",
    movimentation: "",
    liftBow: "",
    doFirstAttack: "",
    firstAttackTwoHand: "",
    firstParanormalStrike: "",
    firstAgainstBlood: "",
    firstFirstUse: "",
    firstThreatSword: "",
    firstTestSword: "",
    firstUpgradeOcultism: "",
    doSecondAttack: "",
    secondAttackTwoHand: "",
    secondParanormalStrike: "",
    secondAgainstBlood: "",
    secondFirstUse: "",
    secondThreatSword: "",
    secondTestSword: "",
    secondUpgradeOcultism: "",
    doThirdAttack: "",
    thirdAttackTwoHand: "",
    thirdParanormalStrike: "",
    thirdAgainstBlood: "",
    thirdFirstUse: "",
    thirdThreatSword: "",
    thirdTestSword: "",
    thirdUpgradeOcultism: "",
  });

  const [firstStrike, setFirstStrike] = useState("");
  const [secondStrike, setSecondStrike] = useState("");
  const [thirdStrike, setThirdStrike] = useState("");
  const [forthStrike, setForthStrike] = useState("");
  //---------------------------------------------------------------
  //Eventos de mudança do formulário

  function handleNotCheckboxChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    const newData = { ...data, [inputName]: inputValue };
    console.log(newData);
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
    let totalDiceAmmount = Number(data.diceAmmount);
    let totalThreat = Number(data.threat);
    let diceType = data.weaponDamage;
    let bonusDamage = Number(data.strength);
    let bonusTest = Number(data.bonusTest) + Number(data.ocultism);
    let strength = Number(data.strength);

    //Adições que serão feitas de acordo com as opções Marcadas
    function addPE(value: number) {
      totalPE += value;
    }
    function addDice(value: number) {
      totalDiceAmmount += value;
    }
    function addThreat(value: number) {
      totalThreat -= value;
    }
    function addBonusDamage(value: number) {
      bonusDamage += value;
    }
    function addBonusTest(value: number) {
      bonusTest += value;
    }

    //Fuções de cada opção

    // BATALHA REATIVA
    if (Number(data.reactiveBattle) == 1) {
      addPE(1);
    }
    if (Number(data.reactiveBattle) > 1) {
      const additionalReactions = Number(data.reactiveBattle) - 1;
      addPE(additionalReactions * 2 + 1);
    }

    // SUSTENTANDO RITUAL
    if (data.sustainingRitual) {
      addPE(1);
    }

    // SUSTENTANDO ARCO
    if (data.sustainingBow) {
      addPE(1);
    }
    // EU E ELA
    if (data.meAndShe) {
      addBonusTest(10);
    }
    // CHRONO
    if (data.chrono) {
      addBonusTest(5);
    }
    //MELHOROU OCULTISMO
    if (data.upgradedOcultism) {
      addBonusTest(2);
    }
    // SURTO TEMPORAL
    if (data.timeSpurt) {
      addPE(3);
    }
    // MOVIMENTAÇÃO DE COMBATE
    if (data.movimentation) {
      addPE(3);
    }
    // MOVIMENTAÇÃO DE COMBATE
    if (data.liftBow) {
      addPE(2);
    }

    // PRIMEIRO RITUAL
    if (data.firstRitualCircle) {
      addPE(Number(data.firstRitualCircle));
    }
    if (data.firstModificationPE) {
      addPE(Number(data.firstModificationPE));
    }
    // SEGUNDA RITUAL
    if (data.secondRitualCircle) {
      addPE(Number(data.secondRitualCircle));
    }
    if (data.secondModificationPE) {
      addPE(Number(data.secondModificationPE));
    }
    // TERCEIRO RITUAL
    if (data.thirdRitualCircle) {
      addPE(Number(data.thirdRitualCircle));
    }
    if (data.thirdModificationPE) {
      addPE(Number(data.thirdModificationPE));
    }

    //PRIMEIRO ATAQUE
    if (data.doFirstAttack) {
      calculateFirstStrike();
    }

    //SEGUNDO ATAQUE
    if (data.doSecondAttack) {
      calculateSecondStrike();
    }
    //TERCEIRO ATAQUE
    if (data.doThirdAttack) {
      calculateThirdStrike();
    }

    function calculateFirstStrike() {
      let attackStrength = 0;
      let attackBonusTest = bonusTest;
      let attackThreat = totalThreat;

      //DUAS MÃOS
      if (data.firstAttackTwoHand != "") {
        attackStrength += strength * 2;
      } else {
        attackStrength += strength;
      }
      //GOLPE PARANORMAL
      if (data.firstParanormalStrike != "") {
        attackBonusTest += strength + 1;
        attackThreat -= 1;
        addPE(2);
      } else {
        attackBonusTest += 1;
        attackThreat -= 1;
      }
      //CONTRA SANGUE
      if (data.firstAgainstBlood != "") {
        attackBonusTest += 2;
        attackThreat -= 2;
      }
      //PRIMEIRO USO
      if (data.firstFirstUse != "") {
        attackBonusTest += 5;
      }
      // REDUZIR AMEAÇA ESPADA
      if (data.firstThreatSword != "") {
        attackThreat -= 2;
        addPE(1);
      }

      if (data.firstTestSword != "") {
        attackBonusTest += 2;
        addPE(1);
      }

      if (data.firstUpgradeOcultism != "") {
        attackBonusTest += 3;
        addPE(1);
      }

      let firstStrike = `${strength}#d20+${attackBonusTest} (Crit ${attackThreat} | ${totalDiceAmmount}d${diceType}+${attackStrength})`;
      setFirstStrike(firstStrike);
    }
    function calculateSecondStrike() {
      let attackStrength = 0;
      let attackBonusTest = bonusTest;
      let attackThreat = totalThreat;

      //DUAS MÃOS
      if (data.secondAttackTwoHand != "") {
        attackStrength += strength * 2;
      } else {
        attackStrength += strength;
      }
      //GOLPE PARANORMAL
      if (data.secondParanormalStrike != "") {
        attackBonusTest += strength + 1;
        attackThreat -= 1;
        addPE(2);
      } else {
        attackBonusTest += 1;
        attackThreat -= 1;
      }
      //CONTRA SANGUE
      if (data.secondAgainstBlood != "") {
        attackBonusTest += 2;
        attackThreat -= 2;
      }
      //PRIMEIRO USO
      if (data.secondFirstUse != "") {
        attackBonusTest += 5;
      }
      // REDUZIR AMEAÇA ESPADA
      if (data.secondThreatSword != "") {
        attackThreat -= 2;
        addPE(1);
      }

      if (data.secondTestSword != "") {
        attackBonusTest += 2;
        addPE(1);
      }

      if (data.secondUpgradeOcultism != "") {
        attackBonusTest += 3;
        addPE(1);
      }

      let secondStrike = `${strength}#d20+${attackBonusTest} (Crit ${attackThreat} | ${totalDiceAmmount}d${diceType}+${attackStrength})`;

      setSecondStrike(secondStrike);
    }
    function calculateThirdStrike() {
      let attackStrength = 0;
      let attackBonusTest = bonusTest;
      let attackThreat = totalThreat;

      //DUAS MÃOS
      if (data.thirdAttackTwoHand != "") {
        attackStrength += strength * 2;
      } else {
        attackStrength += strength;
      }
      //GOLPE PARANORMAL
      if (data.thirdParanormalStrike != "") {
        attackBonusTest += strength + 1;
        attackThreat -= 1;
        addPE(2);
      } else {
        attackBonusTest += 1;
        attackThreat -= 1;
      }
      //CONTRA SANGUE
      if (data.thirdAgainstBlood != "") {
        attackBonusTest += 2;
        attackThreat -= 2;
      }
      //PRIMEIRO USO
      if (data.thirdFirstUse != "") {
        attackBonusTest += 5;
      }
      // REDUZIR AMEAÇA ESPADA
      if (data.thirdThreatSword != "") {
        attackThreat -= 2;
        addPE(1);
      }

      if (data.thirdTestSword != "") {
        attackBonusTest += 2;
        addPE(1);
      }

      if (data.thirdUpgradeOcultism != "") {
        attackBonusTest += 3;
        addPE(1);
      }

      let thirdStrike = `${strength}#d20+${attackBonusTest} (Crit ${attackThreat} | ${totalDiceAmmount}d${diceType}+${attackStrength})`;

      setThirdStrike(thirdStrike);
    }
    // console.log(firstStrike, secondStrike, thirdStrike);

    const strikes = {
      firstStrike,
      secondStrike,
      thirdStrike,
      forthStrike,
    };
    const damageInfo = {
      totalDiceAmmount,
      totalPE,
      totalThreat,
      diceType,
      bonusDamage,
      strikes,
    };

    setDamageInfo(damageInfo);
  }

  return (
    <div>
      <aside className={styles.aside}>
        <div className={styles.title}>Calculadora</div>
        <form onSubmit={handleCalculateInfo}>
          <div className={styles.sidebarWrapper}>
            <div className={styles.sidebarRow}>
              <div className={styles.sidebarColummn}>
                <div className={styles.columnTitle}> Atributos</div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Força </div>
                  <input
                    className={styles.longInput}
                    name="strength"
                    type="text"
                    onChange={handleNotCheckboxChange}
                    value={data.strength}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Ocultismo </div>
                  <input
                    className={styles.longInput}
                    name="ocultism"
                    type="text"
                    onChange={handleNotCheckboxChange}
                    value={data.ocultism}
                  />
                </div>

                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Dano arma:</div>
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
                  <div className={styles.labelInput}> Ameaça base: </div>
                  <input
                    className={styles.longInput}
                    name="threat"
                    type="text"
                    onChange={handleNotCheckboxChange}
                    value={data.threat}
                  />
                </div>               
              </div>

              <div className={styles.sidebarColummn}>
                <div className={styles.columnTitle}> Efeitos Ativos</div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Sustentando ritual: </div>
                  <input
                    className={styles.longInput}
                    name="sustainingRitual"
                    type="checkbox"
                    value={data.sustainingRitual}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Sustentando arco: </div>
                  <input
                    className={styles.longInput}
                    name="sustainingBow"
                    type="checkbox"
                    value={data.sustainingBow}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Eu e Ela: </div>
                  <input
                    className={styles.longInput}
                    name="meAndShe"
                    type="checkbox"
                    value={data.meAndShe}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Livro do Chrono: </div>
                  <input
                    className={styles.longInput}
                    name="chrono"
                    type="checkbox"
                    value={data.chrono}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Melhorou ocultismo com espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="upgradedOcultism"
                    type="checkbox"
                    value={data.upgradedOcultism}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className={styles.sidebarColummn}>
                <div className={styles.columnTitle}> Ativáveis</div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Surto Temporal: </div>
                  <input
                    className={styles.longInput}
                    name="timeSpurt"
                    type="checkbox"
                    value={data.timeSpurt}
                    onChange={handleCheckboxChange}
                  />
                </div>

                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Movimentação de Combate:
                  </div>
                  <input
                    className={styles.longInput}
                    name="movimentation"
                    type="checkbox"
                    value={data.movimentation}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Levantar Arco:</div>
                  <input
                    className={styles.longInput}
                    name="liftBow"
                    type="checkbox"
                    value={data.liftBow}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Batalha Reativa: </div>
                  <input
                    className={styles.longInput}
                    name="reactiveBattle"
                    type="text"
                    value={data.reactiveBattle}
                    onChange={handleNotCheckboxChange}
                  />
                </div>
              </div>

              <div className={styles.sidebarColummn}>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Ritual:</div>

                  <select
                    className={styles.longInput}
                    name="firstRitualCircle"
                    onChange={handleNotCheckboxChange}
                    value={data.firstRitualCircle}
                  >
                    <option value="">Não</option>
                    <option value="1">1º Círculo</option>
                    <option value="3">2º Círculo</option>
                    <option value="6">3º Círculo</option>
                    <option value="10">4º Círculo</option>
                  </select>
                </div>

                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> PE de modificação: </div>
                  <input
                    className={styles.longInput}
                    name="firstModificationPE"
                    type="text"
                    onChange={handleNotCheckboxChange}
                    value={data.firstModificationPE}
                  />
                </div>

                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Ritual:</div>

                  <select
                    className={styles.longInput}
                    name="secondRitualCircle"
                    onChange={handleNotCheckboxChange}
                    value={data.secondRitualCircle}
                  >
                    <option value="">Não</option>
                    <option value="1">1º Círculo</option>
                    <option value="3">2º Círculo</option>
                    <option value="6">3º Círculo</option>
                    <option value="10">4º Círculo</option>
                  </select>
                </div>

                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> PE de modificação: </div>
                  <input
                    className={styles.longInput}
                    name="secondModificationPE"
                    type="text"
                    onChange={handleNotCheckboxChange}
                    value={data.secondModificationPE}
                  />
                </div>

                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Ritual:</div>

                  <select
                    className={styles.longInput}
                    name="thirdRitualCircle"
                    onChange={handleNotCheckboxChange}
                    value={data.thirdRitualCircle}
                  >
                    <option value="">Não</option>
                    <option value="1">1º Círculo</option>
                    <option value="3">2º Círculo</option>
                    <option value="6">3º Círculo</option>
                    <option value="10">4º Círculo</option>
                  </select>
                </div>

                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> PE de modificação: </div>
                  <input
                    className={styles.longInput}
                    name="thirdModificationPE"
                    type="text"
                    onChange={handleNotCheckboxChange}
                    value={data.thirdModificationPE}
                  />
                </div>
              </div>
            </div>

            <div className={styles.sidebarRow}>
              <div className={styles.sidebarColummn}>
                <div className={styles.columnTitle}> 1º Ataque</div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Realizar Ataque </div>
                  <input
                    className={styles.longInput}
                    name="doFirstAttack"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={data.doFirstAttack}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Duas mãos: </div>
                  <input
                    className={styles.longInput}
                    name="firstAttackTwoHand"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={data.firstAttackTwoHand}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Golpe Paranormal: </div>
                  <input
                    className={styles.longInput}
                    name="firstParanormalStrike"
                    type="checkbox"
                    value={data.firstParanormalStrike}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Contra Sangue: </div>
                  <input
                    className={styles.longInput}
                    name="firstAgainstBlood"
                    type="checkbox"
                    value={data.firstAgainstBlood}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Primeiro uso da Espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="firstFirstUse"
                    type="checkbox"
                    value={data.firstFirstUse}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Reduzir ameaça espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="firstThreatSword"
                    type="checkbox"
                    value={data.firstThreatSword}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Adicionar bônus teste espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="firstTestSword"
                    type="checkbox"
                    value={data.firstTestSword}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Melhorar ocultismo secundário:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="firstUpgradeOcultism"
                    type="checkbox"
                    value={data.firstUpgradeOcultism}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className={styles.sidebarColummn}>
                <div className={styles.columnTitle}> 2º Ataque</div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Realizar Ataque </div>
                  <input
                    className={styles.longInput}
                    name="doSecondAttack"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={data.doSecondAttack}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Duas mãos: </div>
                  <input
                    className={styles.longInput}
                    name="secondAttackTwoHand"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={data.secondAttackTwoHand}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Golpe Paranormal: </div>
                  <input
                    className={styles.longInput}
                    name="secondParanormalStrike"
                    type="checkbox"
                    value={data.secondParanormalStrike}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Contra Sangue: </div>
                  <input
                    className={styles.longInput}
                    name="secondAgainstBlood"
                    type="checkbox"
                    value={data.secondAgainstBlood}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Primeiro uso da Espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="secondFirstUse"
                    type="checkbox"
                    value={data.secondFirstUse}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Reduzir ameaça espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="secondThreatSword"
                    type="checkbox"
                    value={data.secondThreatSword}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Adicionar bônus teste espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="secondTestSword"
                    type="checkbox"
                    value={data.secondTestSword}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Melhorar ocultismo secundário:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="secondUpgradeOcultism"
                    type="checkbox"
                    value={data.secondUpgradeOcultism}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>

              <div className={styles.sidebarColummn}>
                <div className={styles.columnTitle}> 3º Ataque</div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Realizar Ataque </div>
                  <input
                    className={styles.longInput}
                    name="doThirdAttack"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={data.doThirdAttack}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}> Duas mãos: </div>
                  <input
                    className={styles.longInput}
                    name="thirdAttackTwoHand"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={data.thirdAttackTwoHand}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Golpe Paranormal: </div>
                  <input
                    className={styles.longInput}
                    name="thirdParanormalStrike"
                    type="checkbox"
                    value={data.thirdParanormalStrike}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>Contra Sangue: </div>
                  <input
                    className={styles.longInput}
                    name="thirdAgainstBlood"
                    type="checkbox"
                    value={data.thirdAgainstBlood}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Primeiro uso da Espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="thirdFirstUse"
                    type="checkbox"
                    value={data.thirdFirstUse}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Reduzir ameaça espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="thirdThreatSword"
                    type="checkbox"
                    value={data.thirdThreatSword}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Adicionar bônus teste espada:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="thirdTestSword"
                    type="checkbox"
                    value={data.thirdTestSword}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <div className={styles.labelInput}>
                    Melhorar ocultismo secundário:{" "}
                  </div>
                  <input
                    className={styles.longInput}
                    name="thirdUpgradeOcultism"
                    type="checkbox"
                    value={data.thirdUpgradeOcultism}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit"> Calcular</button>
        </form>
      </aside>
    </div>
  );
}
