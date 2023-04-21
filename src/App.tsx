import { Button, Layout, List } from 'antd';
import { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';
import { EChoice4 } from './Answer4';
import './App.css';
import { getEgogrammeResult, TLifePositionTotal } from './egogramme';
import EgogrammeResults from './EgogrammeResults';
import MiniMap from './MiniMap';
import QuestionDisplayed from './QuestionDisplayed';
import { questions } from './questions';
import QuestionWithAnswer from './QuestionWithAnswer';

export default function App() {
   const [questionsWithAnswer, setQuestionsWithAnswer] = useState<QuestionWithAnswer[]>([])
   const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false)
   const [lifePositionsTotals, setLifePositionsTotals] = useState<TLifePositionTotal[]>([])

   useEffect(() => {
      setQuestionsWithAnswer(questions.map(question => ({ id: question.id, questionId: question.questionId, questionText: question.questionText, answer: question.answer })))
   }, []);


   function scrollToQuestion(questionId: number) {
      if (questionId + 1 < questionsWithAnswer.length) {
         if (!questionsWithAnswer[questionId + 1].answer) {
            scroller.scrollTo(`index${questionId}`, { duration: 800, smooth: true, containerId: 'content' })
         }
      }
   }

   function setAnswer(questionId: number, answer: EChoice4) {
      const questionWithAnswer = questionsWithAnswer.find(questionWithAnswer => questionWithAnswer.id === questionId);
      if (!questionWithAnswer) throw Error(`id ${questionId} does not exist in questionsWithAnswers)`);
      const newQuestions = [...questionsWithAnswer.filter(questionWithAnswer => questionWithAnswer.id !== questionId), { ...questionWithAnswer, answer }];
      setQuestionsWithAnswer(newQuestions.sort((question1, question2) => question1.id - question2.id));
      scrollToQuestion(questionId);
   }



   function validate() {
      const lifePositionsTotals = getEgogrammeResult(questionsWithAnswer);
      setLifePositionsTotals(lifePositionsTotals);
      setIsResultDisplayed(true);
   }

   return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontSize: '24px' }}>
         <Layout.Header style={{ height: '64px', display: 'flex' }}>
            <div style={{ color: 'white' }}>
               Coucou
            </div>
         </Layout.Header>
         <Layout.Content id='content'>
            {!isResultDisplayed && <div style={{ flex: 1, display: 'flex', overflowY: 'scroll' }}>
               <div style={{
                  position: "sticky", top: '10px', left: '3px',
                  height: 'calc(100% - 20px)', width: '10px', backgroundColor: 'lightGrey', borderRadius: '30px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
               }}>
                  <MiniMap questionsWithAnswer={questionsWithAnswer} scrollToQuestion={scrollToQuestion} />
               </div>
               <div style={{ height: '100%', width: '100%', display: 'block', padding: '0 20px' }}>
                  <Button onClick={validate}>
                     Valider
                  </Button>
                  <List
                     itemLayout="horizontal"
                     dataSource={questionsWithAnswer}
                     renderItem={(questionWithAnswer) => (
                        <List.Item>
                           <QuestionDisplayed id={`index${questionWithAnswer.id}`} questionWithAnswer={questionWithAnswer} setAnswer={setAnswer} />
                        </List.Item>
                     )} />
                  <Button onClick={() => scroller.scrollTo('index8', { duration: 1000, smooth: true, containerId: 'content' })}>Top</Button>
                  {/* <Link activeClass="active" to="index2" spy={true} smooth={true} offset={50} duration={500} >
                  Test 1
               </Link> */}

               </div>
            </div>}
            {isResultDisplayed && <EgogrammeResults lifePositionsTotals={lifePositionsTotals} />}
         </Layout.Content>
      </div>
   );
}

