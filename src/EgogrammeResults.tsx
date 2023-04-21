import { getLifePositionValue, TLifePositionTotal } from "./egogramme";

interface TLevel {
   limits: number[];
   traits: string[]
}
interface TEgogrammePositionResult {
   positionName: string,
   positionTitle: string,
   low: TLevel,
   medium: TLevel,
   high: TLevel,
}
const EGOGRAMME_RESULT_TEMPLATE: TEgogrammePositionResult[] = [
   {
      positionName: "pp",
      positionTitle: "OK+ / OK+",
      low: { limits: [8, 16], traits: ["Ne communique pas facilement", "Problème d'intégration", "Peu naturel", "Mal dans sa peau"] },
      medium: { limits: [17, 23], traits: ["N'accepte pas toujours les autres", "Assez sociable", "S'intègre bien", "Assez à l'aise dans sa peau", "Agréable en société"] },
      high: { limits: [24, 32], traits: ["épanouissement", "tout à fait bien dans sa peau", "ouverture d'esprit"] },
   }, {
      positionName: "pm",
      positionTitle: "OK+ / OK-",
      low: { limits: [8, 16], traits: ["Ne s'impose pas", "N'est pas vaniteux", "Ne pense pas avoir raison", "Modeste"] },
      medium: { limits: [17, 23], traits: ["Assez méprisant", "Sait toujours tout", "Ne se remet pas en question", "Ne sait pas dialoguer"] },
      high: { limits: [24, 32], traits: ["Dévalorisant", "Autoritaire", "Prétentieux", "Outrecuidant", "Esprit de compétition", "Relations désagréables"] },
   }, {
      positionName: "mp",
      positionTitle: "OK- / OK+",
      low: { limits: [8, 16], traits: ["Ne se dévalorise pas", "Ne manque pas d'assurance", "Sait prendre des initiatives"] },
      medium: { limits: [17, 23], traits: ["Relativement dépendant", "Craint les responsabilités", "Se sous-estime", "Timide"] },
      high: { limits: [24, 32], traits: ["Aucune confiance en soi", "Complexé", "Mal dans sa peau", "Sentiment d'infériorité", "Soumis"] },
   }, {
      positionName: "mm",
      positionTitle: "OK- / OK-",
      low: { limits: [8, 16], traits: ["Apprécie la vie", "Ne désespère pas", "Sait réagir"] },
      medium: { limits: [17, 23], traits: ["Pessimiste", "Désabusé", "Désespéré", "Ne donne aucun sens à la vie", "Refus de lutter"] },
      high: { limits: [24, 32], traits: ["Déprimé", "Dépressif", "Pas du tout intégré", "fataliste", "Marginal"] },
   },
]



interface EgogrammePositionResultProps {
   positionLevel: TLevel,
   value: number
}

function EgogrammePositionResult(props: EgogrammePositionResultProps) {
   const isSelected = props.value >= props.positionLevel.limits[0] && props.value <= props.positionLevel.limits[1];
   let fontWeight = 'normal', backgroundColor = 'inherit', color = 'drakGrey';
   if (isSelected) {
      fontWeight = 'bold';
      backgroundColor = 'green';
      color = 'white'
   }
   return (
      <div style={{
         display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px',
         fontWeight, backgroundColor, color, textAlign: 'center', borderRadius: '15px'
      }}>
         {props.positionLevel.traits.map((text, index) => <div key={index}>{text}</div>)}
      </div>
   )
}

export interface EgogrammeResultsProps {
   lifePositionsTotals: TLifePositionTotal[],
}

export default function EgogrammeResults(props: EgogrammeResultsProps) {
   return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
         {EGOGRAMME_RESULT_TEMPLATE.map((resultPosition, index) => {
            const value = getLifePositionValue(props.lifePositionsTotals, resultPosition.positionName);
            return (
               <>
                  <div key={index} style={{
                     width: '100%', backgroundColor: 'lightGrey', borderRadius: '20px', padding: '2px 10px', display: 'flex', flexDirection: 'column',
                     marginBottom: index < EGOGRAMME_RESULT_TEMPLATE.length ? '40px' : 0
                  }}>
                     <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ flex: 2 }} />
                        <div style={{ flex: 25 }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
                              {Array.from(Array(25).keys()).map(elt => {
                                 const adjustedElt = elt + 8;
                                 return (
                                    <div key={elt} style={{ fontSize: '1em', fontWeight: 'bold' }}>
                                       {adjustedElt === value ? adjustedElt : <div style={{ minHeight: '2px', minWidth: '2px', backgroundColor: 'blue' }} />}
                                    </div>
                                 )
                              })}
                           </div>
                        </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', width: '100%', flex: 1 }}>
                        <div style={{ flex: 2, textAlign: 'center', fontWeight: 'bold' }}>
                           {resultPosition.positionTitle}
                        </div>
                        <div style={{ flex: 9 }}>
                           <EgogrammePositionResult positionLevel={resultPosition.low} value={value} />
                        </div>
                        <div style={{ flex: 7 }}>
                           <EgogrammePositionResult positionLevel={resultPosition.medium} value={value} />
                        </div>
                        <div style={{ flex: 9 }}>
                           <EgogrammePositionResult positionLevel={resultPosition.high} value={value} />
                        </div>
                     </div>
                  </div>
               </>
            )
         })}
      </div>
   )
}

// 