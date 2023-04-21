import { EChoice4 } from "./Answer4";

export default interface QuestionWithAnwser {
   id: number,
   questionId: number,
   questionText: string,
   answer: EChoice4 | undefined
}