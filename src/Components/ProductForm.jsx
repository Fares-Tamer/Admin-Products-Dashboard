import { useState } from "react"
import ProductTable from "./ProductTable"
import ProductSearch from "./ProductSearch"
import ProductSort from "./ProductSort"
import { useUser } from "@clerk/clerk-react"
import { toast } from "react-toastify"


export default function ProductForm() {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [taxes, setTaxes] = useState("")
    const [ads, setAds] = useState("")
    const [discount, setDiscount] = useState("") 
    const [category, setCategory] = useState('')
    const [count, setCount] = useState('')
    const [idCounter, setIdCounter] = useState(1)
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState('')
    const [searchMode, setSearchMode] = useState('title') 
    const [sortValue, setSortValue] = useState('') 
    let {user} = useUser() 

    const total = Number(price) + Number(taxes) + Number(ads) - Number(discount)

    const [products, setProducts] = useState(() => {
        const stored = localStorage.getItem("products")
        return stored ? JSON.parse(stored) : []
    }) 


    const handleInputs = (setter) => (e) => {
        const value = e.target.value
        if (value <= 0) return;
        setter(value)
    }

    // const newProduct = {
    //     id: idCounter,
    //     title,
    //     price,
    //     taxes,
    //     ads,
    //     discount,
    //     total,
    //     count,
    //     category
    // }


    const createHandle = () => {
        if(!user){
            toast.error("Please sign in to create a product ")
            return 
        }
        if (title === '' || price === '') {
            toast.warning("Please enter title and price") 
            return}
        setProducts(prevProducts => {
            let updated = [...prevProducts]
            for (let index = 0; index < Number(count); index++) {
                updated.push({
                    id: idCounter + index,
                    title,
                    price,
                    taxes,
                    ads,
                    discount,
                    total,
                    count,
                    category
                })
            }
            toast.success("Product is added Successfully") 
            // console.log(updated) 
            localStorage.setItem("products", JSON.stringify(updated))
            return updated
        })
        setIdCounter(prev => prev + Number(count))
        // reset Inputs
        setTitle('')
        setPrice('')
        setTaxes('')
        setAds('')
        setCount(1)
        setCategory('')
        setDiscount('')
    }

    const updateProduct = (productId) => {
        if(!user){
            toast.error("Please sign in to update a product ")
            return 
        } 
        for (let index = 0; index < products.length; index++) {
            if (products[index].id === productId) {
                setIsEdit(true)
                setEditId(productId)
                setTitle(products[index].title)
                setPrice(products[index].price)
                setAds(products[index].ads)
                setTaxes(products[index].taxes)
                setCategory(products[index].category)
                setDiscount(products[index].discount)
                break;
            }
        }
         
    }

    const saveUpdate = () => {
        setProducts(prev => {
            let updateArray = prev.map(product => product.id === editId ? { ...product, title, price, ads, taxes, category, discount } : product)
            
            localStorage.setItem("products", JSON.stringify(updateArray))
            return updateArray
        })
        toast.success("Product updated")
        setIsEdit(false)

        setEditId(null)
        // reset Inputs
        setTitle('')
        setPrice('')
        setTaxes('')
        setAds('')
        setCount(1)
        setCategory('')
        setDiscount('')
    }

    const filteredProducts = products.filter(product => {
        if (search === '') return true;
        if (searchMode === 'title') {
            return product.title
                .toLowerCase()
                .includes(search.toLowerCase())
        }
        if (searchMode === 'category') {
            return product.category.toLowerCase().includes(search.toLowerCase())
        }
        return true
    });

    const clearProducts = ()=>{
        if(!user){
            toast.error("Please sign in to create a product ")
            return 
        } 
        const clearConfirm = window.confirm("Are you want to delete all products?") 
        if(!clearConfirm) return
        setProducts([])
        localStorage.removeItem("products") 
        toast.warn("All Products cleared") 
    } 

    return <>
        <div className='bg-white dark:bg-gray-900 min-h-fit rounded-lg p-6 mx-2 md:mx-0 shadow'>
            {/* Inputs */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <input type="text" placeholder='Title' className='input' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="number" placeholder='price' className='input ' value={price} onChange={handleInputs(setPrice)} min="0" />
                <input type="number" placeholder='Taxes' className='input disabled:opacity-50 disabled:cursor-not-allowed' value={taxes} onChange={handleInputs(setTaxes)} disabled={price == ''} />
                <input type="number" placeholder='Ads' className='input disabled:opacity-50 disabled:cursor-not-allowed' value={ads} onChange={handleInputs(setAds)} disabled={price == ''} />
                <input type="number" placeholder='Discount' className='input disabled:opacity-50 disabled:cursor-not-allowed' value={discount} onChange={handleInputs(setDiscount)} disabled={price == ''} />
                <input type="number" placeholder='Count' className='input disabled:opacity-50 disabled:cursor-not-allowed' value={count} onChange={handleInputs(setCount)} min="1" disabled={isEdit}/>
                <input type="text" placeholder='Category' className='input md:col-span-2' value={category} onChange={(e) => setCategory(e.target.value)} />

                <input type="number" placeholder='Total' className={`input cursor-not-allowed`} disabled value={total} />
            </div>
            {/* Button */}
            <button onClick={isEdit ? saveUpdate : createHandle} className='mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition cursor-pointer'>{isEdit ? "Update" : "Create"}</button>
        </div>
        <ProductSearch search={search} setSearch={setSearch} searchMode={searchMode} setSearchMode={setSearchMode} filteredProducts={filteredProducts} clearProducts={clearProducts}/> 
        <ProductSort sortValue={sortValue} setSortValue={setSortValue} />   
        <ProductTable search={search} products={products} setProducts={setProducts} updateProduct={updateProduct} searchMode={searchMode} sortValue={sortValue} filteredProducts={filteredProducts}/>
    </>
}
