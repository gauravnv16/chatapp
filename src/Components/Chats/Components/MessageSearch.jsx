function MessageSearch({ Search }){
    return <section className="flex justify-end p-3">
                <section
                className="flex items-center border-2 border-gray-300 px-3 py-2 rounded"
                style={{}}
                >
                <img
                    src="https://img.icons8.com/color/24/000000/search--v1.png"
                    alt="search"
                    className="w-6 h-6 mr-2"
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="focus:outline-none"
                    onChange={Search}
                />
                </section>
            </section>
}

export default MessageSearch;