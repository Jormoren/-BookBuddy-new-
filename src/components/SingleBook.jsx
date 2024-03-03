import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleBook } from "../Api";


const SingleBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function getBookDetails() {
            const bookDetails = await fetchSingleBook(id);
            setBook(bookDetails);
        }
        getBookDetails();
    }, [id]); 

    const handleClick = () => {
        fetch(`${API_URL}/books/` + book.id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                available: false,
            })
        })
            .then(response => response.json())
            .then(result => {
                alert('You successfully checked out the book: ' + book.title);
            })
            .catch(console.error);
    }

    return (
        <div>
            <h2>Single Book:</h2>
            {book ? (
                <ul className="bookCard">
                    <li>Title: {book.title}</li>
                    <li><img src={book.coverimage} alt={book.title} /></li>
                    <li>Author: {book.author}</li>
                    <li>Description: {book.description}</li>
                    <li>ID: {book.id}</li>
                    <button onClick={handleClick}> Checkout Book </button>
                </ul>
            ) : (
                <h3>Please go back to Books and select a Book first to see details.</h3>
            )}
        </div>
    )
}
export default SingleBook;
