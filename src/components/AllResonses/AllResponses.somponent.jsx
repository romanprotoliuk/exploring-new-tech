import Response from "../Response/Response.component"

const AllResponses = ({ responses, loading, setLoading }) => {

  const AllSupaResponses = responses.map((elem, idx) => {
    return <Response key={`response-${idx}`} prompt={elem.prompt} response={elem.response} engine_name={elem.engine_name} />
  })

  return (
    <>
      {AllSupaResponses}
    </>
  )
}

export default AllResponses