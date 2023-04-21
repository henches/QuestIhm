import QuestionWithAnswer from "./QuestionWithAnswer";

export interface MiniMapProps {
   questionsWithAnswer: QuestionWithAnswer[],
   scrollToQuestion: (questionId: number) => void
}


export default function MiniMap(props: MiniMapProps) {
   return (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
         {props.questionsWithAnswer.map(question => {
            const color = question.answer ? 'yellow' : 'orange';
            return (<button key={question.id} style={{ border: `4px solid ${color}`, height: '5px', width: '100%', margin: '0 1px' }} onClick={() => {
               props.scrollToQuestion(question.id)
            }} />)
         })}
      </div>

   )
}