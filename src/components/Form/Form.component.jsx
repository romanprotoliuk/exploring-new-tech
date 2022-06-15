import { useState } from "react";
import { supabase } from "../../utils/supabaseConfig";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import './Form.styles.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Form = (props) => {
  const [engine, setEngine] = useState('')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchOpenAiAPI = (e) => {
    props.setLoading(true)
    e.preventDefault()

    let engineName
    
    switch (engine) {
      case 'text-davinci-002':
        engineName = 'DaVinci';
        break;
      case 'text-babbage-001':
        engineName = 'Babbage';
        break;
      case 'text-ada-001':
        engineName = 'Ada';
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
      // console.log(data.choices)
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

    props.getData()
    if (error) return console.log(error)
  }

  const handleTextAreaChange = (e) => {
    props.setPayload({ ...props.payload, prompt: e.target.value })  
  }
    

  return (
    <>
      <form onSubmit={fetchOpenAiAPI}>
        <div className="textarea-wrapper">
          <label hidden htmlFor="textarea">
            your AI question
          </label>
          <textarea
            className="textarea"
            required
            name="textarea"
            value={props.payload.prompt}
            onChange={(e) => handleTextAreaChange(e)}
            placeholder="Ask me anything"
          />
        </div>

        <div className="dropdown-wrapper">
        <label
          htmlFor="Choose which Ai you would like to query"
          hidden
        ></label>
        <select
          className="dropdown"
          onChange={(e) => setEngine(e.target.value)}
          required  
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
            DaVinci - the decipherer
          </option>
          
          <option
            className="option"
            value="text-babbage-001"
          >
            Babbage - the economical
          </option>
          
          <option
            className="option"
            value="text-ada-001"
          >
            Ada - the punctual
          </option>

        </select>
        
          <input type="submit" />
          <div className="btn-about" onClick={handleOpen}>About</div>

        </div>
      </form>
      
      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* <Typography id="transition-modal-title" align='center' variant="h4" component="h2">
              Merge Sort
            </Typography> */}
            <Typography id="transition-modal-description" variant='h5' sx={{ mt: 0 }}>
            GPT-3 models can understand and generate natural language
            </Typography>
            <Typography id="transition-modal-description" variant='h6' sx={{ mt: 3 }}>
            <span style={{fontWeight: 'bold'}}>Davinci</span> is the most capable model family and can perform any task the other models can perform and often with less instruction. Davinci is quite good at solving many kinds of logic problems and explaining the motives of characters. Davinci has been able to solve some of the most challenging AI problems involving cause and effect. 
            </Typography>
            <Typography id="transition-modal-description" variant='h6' sx={{ mt: 3 }}>
            <span style={{fontWeight: 'bold'}}>Babbage</span> can perform straightforward tasks like simple classification. It’s also quite capable when it comes to Semantic Search ranking how well documents match up with search queries. 
              </Typography>
            <Typography id="transition-modal-description" variant='h6' sx={{ mt: 3 }}>
            <span style={{fontWeight: 'bold'}}>Ada</span> is usually the fastest model and can perform tasks like parsing text, address correction and certain kinds of classification tasks that don’t require too much nuance. Ada’s performance can often be improved by providing more context. 
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
    </>
  )

  }
export default Form