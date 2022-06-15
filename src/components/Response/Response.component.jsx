import './Response.styles.css'

const Response = ({ prompt, response, engine_name }) => {
  const str = engine_name
  str.split('')

  return (
    <div className='card-wrapper-outter'>    
      <div className="card-wrapper">
        <div className="card-inline top-most">
          <div className='first-half'>
            <h4 className='card-text-align card-question'>question:</h4>
          </div>
          <div className='card-question-propmt'>
            <h4 className='card-text-align card-question'>{prompt}</h4>
          </div>
        </div>

        <div className="card-inline">
          <div className='first-half'>
            <h4 className='card-text-align card-question'>{str}:</h4>
          </div>
          <div className='card-question-propmt'>
            <h4 className='card-text-align card-question'>{response}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Response