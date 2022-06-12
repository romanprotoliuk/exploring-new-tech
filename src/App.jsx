import Form from './components/Form/Form.component';
import './App.css';
import { useState } from 'react';

const App = () => {

	const [responses, setResponses] = useState([])
	const [payload, setPayload] = useState({
		prompt: '',
		temperature: 0.5,
		max_tokens: 64,
	})

	const fetchSupabaseData = () => {
		console.log('data pulled')
	}



	return (
		<div className="App">
			<Form
				payload={payload}
				setPayload={setPayload}
				// setResponses={setResponses}
				responses={responses}
				fetchSupabaseData={fetchSupabaseData}
			/>

			
		</div>
	);
}

export default App;
