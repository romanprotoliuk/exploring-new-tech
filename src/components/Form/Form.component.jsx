import axios from "axios";
import { useState } from "react";
import { supabase } from "../../utils/supabaseConfig";

const Form = (props) => {
  const [engine, setEngine] = useState('')

  const fetchOpenAiAPI = (e) => {
    props.setLoading(true)
    e.preventDefault()

    let engineName
    
    switch (engine) {
      case 'text-davinci-002':
        engineName = 'Dr. DaVinci';
        break;
      case 'text-curie-001:':
        engineName = 'Admiral Currie';
        break
      case 'text-babbage-001':
        engineName = 'Major Babbage';
        break;
      case 'text-ada-001':
        engineName = 'Professor Ada';
        break;
      default:
          engineName = 'Response';
    }
    // axios.post(`https://api.openai.com/v1/engines/text-davinci-002/completions`, { body: JSON.stringify(props.payload) }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    //     Authorization: `Bearer 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`,
    //   }
    // }).then((res) => {
    //    console.log(res.data)
    //  })
    fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(props.payload),
    }).then(response => response.json()).then(data => {
      postData(data, engineName)
      console.log(data.choices)
    });
  };

  const postData = async (newData, engine_name) => {
    let promisedData = await newData
    let refinedData = promisedData.choices[0].text

    const { data, error } = await supabase.from('responses').insert([{
      prompt: props.payload.prompt,
      response: refinedData, 
      engine_name: engine_name
    }])

    console.log(data)
    props.getData()
    if (error) return console.log(error)
  }

  const handleTextAreaChange = (e) => {
    props.setPayload({ ...props.payload, prompt: e.target.value })  
    console.log(props.prompt)
  }
    

  return (
    <>
      <form onSubmit={fetchOpenAiAPI} >
        <label hidden htmlFor="textarea">
          your AI question
        </label>
        <textarea
          required
          name="textarea"
          value={props.payload.prompt}
          onChange={(e) => handleTextAreaChange(e)}
        />

        <label
          htmlFor="Choose which Ai you would like to query"
          hidden
        ></label>
        <select
          className="dropdown"
          onChange={(e) => setEngine(e.target.value)}
        >
          <option
            hidden
            value=""
            className="option"
          >
            Choose one
          </option>

          <option
            className="option"
            value="text-davinci-002"
          >
            Dr. DaVinci - the decipherer
          </option>
          
          <option
            className="option"
            value="text-curie-001"
          >
            Admiral Curie - the capable
          </option>
          
          <option
            className="option"
            value="text-babbage-001"
          >
            Major Babbage - the economical
          </option>
          
          <option
            className="option"
            value="text-ada-001"
          >
            Professor Ada - the punctual
          </option>

        </select>
        
        <input type="submit" />
      
			</form>
    </>
  )

  }
export default Form