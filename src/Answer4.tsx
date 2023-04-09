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
   return (
      <div style={{ display: 'flex' }}>
         <p style={{ fontSize: '22px', marginRight: '30px' }}>D'accord</p>
         <Radio.Group className="centered-radio-group" size='large' onChange={onChange} value={props.answer}>
            <Radio className="radio-big" value={1}></Radio>
            <Radio className="radio-normal" value={2}></Radio>
            <Radio className="radio-normal" value={3}></Radio>
            <Radio className="radio-big" value={4}></Radio>
         </Radio.Group>
         <p style={{ fontSize: '22px' }}>Pas d'accord</p>
      </div>
   )
}