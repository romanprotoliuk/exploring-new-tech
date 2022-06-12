import axios from "axios";

const Form = (props) => {

  const fetchOpenAiAPI = (e) => {
   e.preventDefault()
    // axios.post(`https://api.openai.com/v1/engines/text-davinci-002/completions`, { body: JSON.stringify(props.payload) }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    //     Authorization: `Bearer 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`,
    //   }
    // }).then((res) => {
    //    console.log(res.data)
    //  })
    fetch(`https://api.openai.com/v1/engines/text-davinci-002/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(props.payload),
    }).then(response => response.json()).then(data => console.log(data.choices));
  };

  const handleTextAreaChange = (e) => {
    props.setPayload({ ...props.payload, prompt: e.target.value })  
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
        <input type="submit" />
      
			</form>
    </>
  )

  }
export default Form