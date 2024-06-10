import React from 'react'

export default function Card({ books, btnVisible = true }) {

    const saveToStorage = (book) => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        storedBooks.push(book);
        localStorage.setItem('books', JSON.stringify(storedBooks));
    }

    return (
        <div className="px-20 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books?.map((book, index) => (
                <div key={index} className="min-h-40 rounded-md border">
                    <div className="p-4 overflow-hidden">
                        <h1 className="inline-flex items-center text-lg font-semibold">
                            {book.title}
                        </h1>
                        <p className="mt-3 text-sm text-gray-600">
                            {book.author_name && book.author_name.join(', ')}
                        </p>
                        {btnVisible ? <button
                            type="button"
                            className="mt-4 rounded-sm border-2 active:bg-yellow-300 border-yellow-200 bg-yellow-200 px-1.5 py-1 text-[10px] font-semibold text-black shadow-sm hover:border-white hover:border-2"
                            onClick={() => saveToStorage(book)}
                        >
                            Add to bookself
                        </button> : null}
                    </div>
                </div>
            ))}
        </div>
    )
}