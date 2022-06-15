import Form from './components/Form/Form.component';
import './App.css';
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseConfig';
import AllResponses from './components/AllResonses/AllResponses.somponent';

const App = () => {

	const [responses, setResponses] = useState([])
	const [loading, setLoading] = useState(false)
	const [payload, setPayload] = useState({
		prompt: '',
		temperature: 1,
		max_tokens: 64,
	})

	const getData = async () => {
		const { data, error } = await supabase.from('responses').select()
		setLoading(false)
		setResponses(data.reverse())
		if (error) return console.log(error)
	}

	useEffect(() => {
    getData();
  }, []);


	const fetchSupabaseData = () => {
		console.log('data pulled')
	}

	
	return (
		<div className="App">
			<div className='main-wrapper'>
			
			<Form
				payload={payload}
				setPayload={setPayload}
				// setResponses={setResponses}
				setLoading={setLoading}
				getData={getData}
				responses={responses}
				fetchSupabaseData={fetchSupabaseData}
			/>
			<AllResponses responses={responses} loading={loading} setLoading={setLoading}/>

			</div>
		</div>
	);
}

export default App;
