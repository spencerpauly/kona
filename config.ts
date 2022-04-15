const isProduction = process.env.NODE_ENV === 'production';

export const config = {
	apiUrl: isProduction
		? 'https://api.heykona.com/todo-this-needs-to-be-a-real-url'
		: 'http://localhost:1000',
};
