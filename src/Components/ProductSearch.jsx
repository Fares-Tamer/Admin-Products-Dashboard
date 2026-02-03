

export default function ProductSearch({ search, setSearch, searchMode, setSearchMode, filteredProducts,clearProducts }) {
    return <>
        <div className='bg-white dark:bg-gray-900 rounded-lg shadow p-6 mt-8 mx-2 md:mx-0'>
            <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-white'>Search Products</h3>
            {/* Search input */}
            <input type='text' placeholder={searchMode === 'title' ? 'Search by Title' : 'Search by Category'} className='input mb-4' value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className='flex flex-col md:flex-row gap-3'>
                <button onClick={() => setSearchMode('title')} className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer'>Search by Title</button>
                <button onClick={() => setSearchMode('category')} className='flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition cursor-pointer'>Search by Category</button>
            </div>
            {search !== '' ? <button onClick={() => setSearch('')} className='bg-gray-500 px-2 py-1 mt-2 rounded-md cursor-pointer hover:bg-gray-600 transition'>Reset</button> : null}
            {filteredProducts.length > 0 ? <button onClick={clearProducts} className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition cursor-pointer w-full my-2">Clear All({filteredProducts.length})</button> : null}
        </div>

    </>
}
