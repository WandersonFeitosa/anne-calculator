export interface DamageInfo {
  totalPE: number;
  totalThreat: number;
  totalDiceAmmount: number;
  diceType: number;
  bonusDamage: number;
  strikes?: Strikes;
}
interface Strikes {
  firstStrike?: string;
  secondStrike?: string;
  thirdStrike?: string;
  forthStrike?: string;
}
