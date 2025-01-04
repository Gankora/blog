export const deleteSession = async (sessionId) => {
	await fetch(`http://localhost:3005/sessions/${sessionId}`, {
		method: 'DELETE',
	});
};
