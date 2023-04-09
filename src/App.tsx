import { Layout, List } from 'antd';
import { useEffect, useState } from 'react';
import { EChoice4 } from './Answer4';
import './App.css';
import QuestionDisplayed from './QuestionDisplayed';
import QuestionWithAnswer from './QuestionWithAnswer';
import { questions } from './questions';

export default function App() {
   const [questionsWithAnswer, setQuestionsWithAnswer] = useState<QuestionWithAnswer[]>([])

   useEffect(() => {
      setQuestionsWithAnswer(questions.map(question => ({ id: question.id, questionText: question.questionText, answer: undefined })))
   }, []);


   function setAnswer(id: number, answer: EChoice4) {
      console.log("🚀 ~ file: App.tsx:19 ~ setAnswer ~ id:", id)
      console.log("🚀 ~ file: App.tsx:19 ~ setAnswer ~ answer:", answer)
      const questionWithAnswer = questionsWithAnswer.find(questionWithAnswer => questionWithAnswer.id === id);
      if (!questionWithAnswer) throw Error(`id ${id} doesnot exist in questionsWithAnswers)`);
      const newQuestions = [...questionsWithAnswer.filter(questionWithAnswer => questionWithAnswer.id !== id), { ...questionWithAnswer, answer }];
      setQuestionsWithAnswer(newQuestions.sort((question1, question2) => question1.id - question2.id));
   }

   console.log("🚀 ~ file: App.tsx:11 ~ App ~ questionsWithAnswer:", questionsWithAnswer)
   return (
      <div style={{ fontSize: "24px" }}>
         <Layout.Header>
            <div style={{ color: 'white' }}>
               Coucou
            </div>
         </Layout.Header>
         <Layout.Content>
            <List
               itemLayout="horizontal"
               dataSource={questionsWithAnswer}
               renderItem={(questionWithAnswer, index) => (
                  <List.Item>
                     <QuestionDisplayed questionWithAnswer={questionWithAnswer} setAnswer={setAnswer} />
                  </List.Item>
               )}
            />
         </Layout.Content>
      </div>
   );
}

