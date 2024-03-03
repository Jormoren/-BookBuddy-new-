const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api';

// Fetch all books
export async function fetchBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        return response.json();
    } catch (error) {
        console.error('trouble fetching books', error);
        throw error; 
    }
}

// Fetch a single book by ID
export async function fetchSingleBook(bookId) {
    try {
        const response = await fetch(`${API_URL}/books/${bookId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch book #${bookId}`);
        }
        const data = await response.json();
        return data.book;
    } catch (err) {
        console.error(`trouble fetching book #${bookId}!`, err);
        throw err; 
    }
}

// Export the fetchRegister function
export async function fetchRegister(firstname, lastname, email, password) {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password
            })
        });
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        return response.json();
    } catch (err) {
        console.error('Error registering user', err);
        throw err; 
    }
}

// Fetch for user login
export async function fetchLogin(email, password) {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return response.json();
    } catch (err) {
        console.error('Error logging in', err);
        throw err; 
    }
}
