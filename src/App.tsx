import { Button, Layout, List } from 'antd';
import { useEffect, useState } from 'react';
import { Link, scroller } from 'react-scroll';
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

   function scrollToNextQuestion(currentQuestionId: number) {
      console.log("🚀 ~ file: App.tsx:18 ~ scrollToNextQuestion ~ currentQuestionId:", currentQuestionId)
      if (currentQuestionId < questionsWithAnswer.length) {
         if (!questionsWithAnswer[currentQuestionId + 1].answer) {
            console.log("🚀 ~ file: App.tsx:23 ~ scrollToNextQuestion ~ `index${currentQuestionId + 1}`:", `index${currentQuestionId + 1}`)
            scroller.scrollTo(`index${currentQuestionId}`, { duration: 800, smooth: true, containerId: 'content' })
         }
      }
   }

   function setAnswer(questionId: number, answer: EChoice4) {
      console.log("🚀 ~ file: App.tsx:19 ~ setAnswer ~ id:", questionId)
      console.log("🚀 ~ file: App.tsx:19 ~ setAnswer ~ answer:", answer)
      const questionWithAnswer = questionsWithAnswer.find(questionWithAnswer => questionWithAnswer.id === questionId);
      if (!questionWithAnswer) throw Error(`id ${questionId} does not exist in questionsWithAnswers)`);
      const newQuestions = [...questionsWithAnswer.filter(questionWithAnswer => questionWithAnswer.id !== questionId), { ...questionWithAnswer, answer }];
      setQuestionsWithAnswer(newQuestions.sort((question1, question2) => question1.id - question2.id));
      scrollToNextQuestion(questionId);
   }

   console.log("🚀 ~ file: App.tsx:11 ~ App ~ questionsWithAnswer:", questionsWithAnswer)
   return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontSize: '24px' }}>
         <Layout.Header style={{ height: '64px', display: 'flex' }}>
            <div style={{ color: 'white' }}>
               Coucou
            </div>

         </Layout.Header>
         <Layout.Content id='content' style={{ flexGrow: 1, overflowY: 'scroll', display: 'block' }}>
            <List
               itemLayout="horizontal"
               dataSource={questionsWithAnswer}
               renderItem={(questionWithAnswer, index) => (
                  <List.Item>
                     <QuestionDisplayed id={`index${index}`} questionWithAnswer={questionWithAnswer} setAnswer={setAnswer} />
                  </List.Item>
               )} />
            <Button onClick={() => scroller.scrollTo('index8', { duration: 1000, smooth: true, containerId: 'content' })}>Top</Button>
            <Link activeClass="active" to="index2" spy={true} smooth={true} offset={50} duration={500} >
               Test 1
            </Link>
         </Layout.Content>
      </div>
   );
}

