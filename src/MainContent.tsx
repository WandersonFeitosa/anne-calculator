import { DamageInfo } from "./InterfaceTypes";
import anne from "./assets/img/anne.png";

import styles from "./MainContent.module.css";

interface MainContentProps {
  damageInfo: DamageInfo;
}

export function MainContent({ damageInfo }: MainContentProps) {
  return (
    <main>
      <div className={styles.block}>
        <div className={styles.blockTitle}> Informações</div>
        <div>
          <b> PE:</b> {damageInfo.totalPE}
        </div>
        <br />
        <div>
          <b>Testes:</b>
          <br />
          <br />
          <b> 1º: </b>{damageInfo.strikes?.firstStrike} <br /><br />
          <b> 2º:</b> {damageInfo.strikes?.secondStrike} <br /><br />
          <b> 3º:</b> {damageInfo.strikes?.thirdStrike} <br /><br />
        </div>
        <br />
        <div>
          Aperta 2 vezes no calcular pq n tá indo direto e são 7 da manhã, n to
          mt afim de arrumar isso agora.
        </div>
        <br></br>
        <div>
          {" "}
          E se não apertar no realizer ataque não aparece nenhum teste, é só
          copiar a linha inteira e tacar no rollem
        </div>
        <img className={styles.anne} src={anne} alt="" />
      </div>
    </main>
  );
}
