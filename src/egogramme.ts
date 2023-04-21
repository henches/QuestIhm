import { EChoice4 } from "./Answer4";
import QuestionWithAnwser from "./QuestionWithAnswer";

interface TLifePositionType {
    positionName: string,
    questionIds: number[]
}

const LIFE_POSITION_TYPES: TLifePositionType[] = [
    { positionName: 'pp', questionIds: [1, 2, 7, 8, 16, 17, 21, 27] },
    { positionName: 'pm', questionIds: [3, 5, 9, 14, 15, 18, 22, 29] },
    { positionName: 'mp', questionIds: [4, 10, 13, 19, 20, 24, 25, 31] },
    { positionName: 'mm', questionIds: [6, 11, 12, 23, 26, 28, 30, 32] },
]

export interface TLifePositionTotal {
    positionName: string,
    total: number
}

interface TAnswerValue {
    choice: EChoice4,
    value: number
}

const ANSWER_VALUES: TAnswerValue[] = [
    { choice: EChoice4.FULLY_DISAGREE, value: 1 },
    { choice: EChoice4.DISAGREE, value: 2 },
    { choice: EChoice4.AGREE, value: 3 },
    { choice: EChoice4.FULLY_AGREE, value: 4 },
]

export function getLifePositionValue(lifePositionTotals: TLifePositionTotal[], positionName: string) {
    const lifePositionTotal = lifePositionTotals.find(lifePositionTotal => lifePositionTotal.positionName === positionName);
    if (!lifePositionTotal) throw Error("");
    return lifePositionTotal.total;
}

function getAnswerValue(answerChoice: EChoice4 | undefined) {
    if (!answerChoice) return 0;
    const answerValue = ANSWER_VALUES.find(answerValue => answerValue.choice === answerChoice);
    if (!answerValue) throw Error(`Impossible value for answer : ${answerChoice}`);
    return answerValue.value;
}

export function getEgogrammeResult(questionsWithAnswer: QuestionWithAnwser[]) {
    const lifePositionsTotals: TLifePositionTotal[] = [{ positionName: 'pp', total: 0 }, { positionName: 'pm', total: 0 }, { positionName: 'mp', total: 0 }, { positionName: 'mm', total: 0 }];
    questionsWithAnswer.forEach(question => {
        const value = getAnswerValue(question.answer!);
        const lifePositionType = LIFE_POSITION_TYPES.find(lifePosition => {
            const questionId = lifePosition.questionIds.find(questionId => {
                return questionId === question.questionId
            })
            return questionId;
        });
        const lifePosition = lifePositionsTotals.find(lifePosition => lifePosition.positionName === lifePositionType?.positionName);
        if (!lifePosition) throw Error("lifePosition not found");
        lifePosition.total += value;
    });
    return lifePositionsTotals;
}