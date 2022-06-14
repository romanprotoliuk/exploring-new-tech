const Response = ({ prompt, response, engine_name }) => {
  const str = engine_name
  str.split('')

  return (
    <>
      <div>
        <h4>question:</h4>
        <h3>{prompt}</h3>
      </div>
      <div>
        <h3>{str}</h3>
      </div>
      <div>
        <h4>response:</h4>
        <h3>{response}</h3>
      </div>
    </>
  )
}

export default Response