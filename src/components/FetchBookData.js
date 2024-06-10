import React, { useEffect, useState } from 'react'
import Card from './Card';
import Loading from './Loading';

export default function FetchBookData() {
    const [input, setInput] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addBtn, setAddBtn] = useState(true);

    useEffect(() => {
        if (input.length > 0) {
            setLoading(true);
            setAddBtn(true);
            const fetchBooks = async (bookname) => {
                try {
                    const response = await fetch(`https://openlibrary.org/search.json?q=${bookname}&limit=10&page=1`);
                    const data = await response.json();
                    setBooks(data.docs);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
                setLoading(false);
            }
            fetchBooks(input);
        }
        else {
            setBooks([]);
        }
    }, [input])

    const fetchLocalData = () => {
        const loacalData = JSON.parse(localStorage.getItem('books')) || [];
        setBooks(loacalData);
        setAddBtn(false);
    }

    return (
        <div className="w-full mt-12">
            <div className="flex px-20 justify-center items-center">
                <div className="flex-1 me-10 w-full items-center space-x-2 md:w-1/3">
                    <input className="flex h-10 w-full rounded-md border-white border-2 px-3 py-2 text-black placeholder:text-gray-600 font-mono text-lg outline-none bg-slate-200"
                        type="text"
                        value={input}
                        onChange={(e) => { setInput(e.target.value) }}
                        placeholder="Enter book name..."
                        spellCheck="false"
                    />
                </div>
                <button className='rounded-md border-white border-2 px-3 py-1 font-mono text-lg outline-none bg-blue-600' onClick={fetchLocalData}>My Bookself</button>
            </div>

            {(loading && input !== "") ? <Loading /> : <Card books={books} btnVisible={addBtn} />}
        </div>
    )
}
