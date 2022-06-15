import Response from "../Response/Response.component"
import Loading from '../Loading/Loading.component'


const AllResponses = ({ responses, loading, setLoading }) => {

  const AllSupaResponses = responses.map((elem, idx) => {
    return <Response key={`response-${idx}`} prompt={elem.prompt} response={elem.response} engine_name={elem.engine_name} />
  })

  console.log(responses)

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </> ) : ''
      }
      {AllSupaResponses}
    </>
  )
}

export default AllResponses