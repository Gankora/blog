import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
	padding: 20px;
`;

function App() {
	return (
		<Div>
			<i
				className="fa fa-spotify"
				style={{ fontSize: '48px' }}
				aria-hidden="true"
			></i>
			<h2>Hello world</h2>
		</Div>
	);
}

export default App;
