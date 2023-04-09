import { EChoice4 } from "./Answer4";

export default interface QuestioNWithAnwser {
   id: number,
   questionText: string,
   answer: EChoice4 | undefined
}