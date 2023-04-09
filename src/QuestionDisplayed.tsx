import Answer4, { EChoice4 } from "./Answer4"
import QuestionWithAnswer from "./QuestionWithAnswer"

export interface QuestionDisplayedProps {
   questionWithAnswer: QuestionWithAnswer,
   setAnswer: (id: number, answer: EChoice4) => void
}

export default function QuestionDisplayed(props: QuestionDisplayedProps) {
   function setAnswer(answer: EChoice4) {
      props.setAnswer(props.questionWithAnswer.id, answer)
   }
   return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
         <p style={{ fontFamily: "Open Sans, Helvetica Neue, Arial, sans-serif", fontSize: "22px" }}>
            {props.questionWithAnswer.questionText}
         </p>
         <Answer4 answer={props.questionWithAnswer.answer} setAnswer={setAnswer} />
      </div>
   )
}