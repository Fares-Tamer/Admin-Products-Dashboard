import { useUser } from "@clerk/clerk-react"
import { toast } from "react-toastify"


export default function ProductTable({ setProducts, updateProduct, sortValue,filteredProducts}) {
    let {user} = useUser() 
    const DeleteProduct = (productId) => {
        if(!user){
            toast.error("Please sign in to create a product ")
            return 
        }
        setProducts(prevProducts => {
            const updateProducts = prevProducts?.filter((product) => product.id !== productId) // put in new array that product.id !== productId
            localStorage.setItem("products", JSON.stringify(updateProducts))
            return updateProducts
        })
        toast.error("Product deleted") 
    }

    
    const sortProducts = [...filteredProducts.sort((a,b)=>{
        if(sortValue === 'title-asc'){
           return a.title.localeCompare(b.title)
        }
        if(sortValue === 'title-desc'){
            return b.title.localeCompare(a.title)
        }
        if(sortValue === 'price-asc'){
            return a.price - b.price
        }
        if(sortValue === 'price-desc'){
            return b.price - a.price
        }
        if(sortValue === 'total-asc'){
            return a.total - b.total
        }
        if(sortValue === 'total-desc'){
            return b.total - a.total
        }
        return 0 
    })] 

    return <>
        <div className='mt-8 overflow-x-scroll md:overflow-hidden'>
            <table className='w-full text-sm text-center'>
                <thead className='bg-gray-200 dark:bg-gray-800'>
                    <tr className='dark:text-white'>
                        <th className='p-2'>Id</th>
                        <th className='p-2'>Title</th>
                        <th className='p-2'>Price</th>
                        <th className='p-2'>Taxes</th>
                        <th className='p-2'>Ads</th>
                        <th className='p-2'>Discount</th>
                        <th className='p-2'>Total</th>
                        <th className='p-2'>Category</th>
                        <th className='p-2'>Update</th>
                        <th className='p-2'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortProducts?.map((product, index) => {
                            return (
                                <tr key={index} className='border-b dark:border-gray-800 dark:text-white font-semibold'>
                                    <td className='p-2'>{index + 1}</td>
                                    <td className='p-2'>{product.title}</td>
                                    <td className='p-2'>{product.price}</td>
                                    <td className='p-2'>{product.taxes}</td>
                                    <td className='p-2'>{product.ads}</td>
                                    <td className='p-2'>{product.discount}</td>
                                    <td className='p-2'>{product.total}</td>
                                    <td className='p-2'>{product.category}</td>
                                    <td className="p-2"><button onClick={() => updateProduct(product.id)} className="bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-700 transition cursor-pointer text-white">Update</button></td>
                                    <td className="p-2"><button onClick={() => DeleteProduct(product.id)} className="bg-red-600 px-2 py-1 rounded-md hover:bg-red-700 transition cursor-pointer text-white">Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>


    </>
}
