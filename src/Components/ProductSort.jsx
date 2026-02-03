

export default function ProductSort({setSortValue,sortValue}) { 
  return <>
  <div className=" mx-2 md:mx-0">
    
    <select className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white mt-2 " value={sortValue} onChange={(e)=>setSortValue(e.target.value)}> 
        <option value="">Sort by</option>
        <option value="title-asc">Title: A -{'>'} Z</option>
        <option value="title-desc">Title: Z -{'>'} A</option> 
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="total-asc">Total: Low to High</option>
        <option value="total-desc">Total: High to Low</option>
    </select>
  </div>
  
  
  
  
  
  
  </>
}
