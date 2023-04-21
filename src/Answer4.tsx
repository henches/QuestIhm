import { Radio, RadioChangeEvent } from "antd";

export enum EChoice4 {
   FULLY_DISAGREE = 1,
   DISAGREE = 2,
   AGREE = 3,
   FULLY_AGREE = 4
}

export interface Choice4Props {
   answer: EChoice4 | undefined,
   setAnswer: (answer: EChoice4) => void
}
export default function Choice4(props: Choice4Props) {

   function onChange(e: RadioChangeEvent) {
      props.setAnswer(e.target.value)
   }

   const radioGroup = (
      <Radio.Group className="centered-radio-group" size='large' onChange={onChange} value={props.answer}>
         <Radio className="radio-big " value={1} />
         <div className='space-beween-radios' />
         <Radio className="radio-normal" value={2} />
         <div className='space-beween-radios' />
         <Radio className="radio-normal" value={3} />
         <div className='space-beween-radios' />
         <Radio className="radio-big" value={4} />
      </Radio.Group>
   )
   const agree = (
      <p style={{ fontSize: '18px' }}>D'accord</p>
   )

   const disagree = (
      <p style={{ fontSize: '18px' }}>Pas d'accord</p>
   )

   return (
      <>
         <div className="answer-container-large" style={{ justifyContent: 'center', width: '100%' }}>
            {agree}
            <div className='space-between-hint-and-radios' />
            {radioGroup}
            <div className='space-between-hint-and-radios' />
            {disagree}
         </div>
         <div className="answer-container-small" style={{ flexDirection: 'column', justifyContent: 'center' }}>
            {radioGroup}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
               {agree}
               {disagree}
            </div>
         </div>
      </>
   )
}