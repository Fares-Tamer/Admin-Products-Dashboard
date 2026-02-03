import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Moon, Sun } from "lucide-react";



export default function Navbar({ theme, setTheme }) {

    return <>
        <div className="bg-gray-200 shadow-md py-4 dark:bg-gray-800"> 
            <div className="max-w-7xl mx-auto flex justify-between items-center dark:text-white px-2 md:px-0">
                {/* title */}
                <h1 className="text-md font-bold sm:text-2xl tracking-wide">PRODUCT MANAGEMENT SYSTEM</h1>
                <div className="flex items-center justify-center gap-2">
                    <header>
                        <SignedOut>
                            <SignInButton className='bg-black py-1 px-2 text-white rounded-md cursor-pointer dark:bg-gray-200 dark:text-black text-sm sm:text-lg' />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </header>


                    <button className="cursor-pointer p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition">
                        {theme === 'dark' ? <Sun onClick={()=>setTheme('light')} size={30} color="white"/> : <Moon onClick={()=>setTheme('dark')} size={30} />}
                    </button> 
                </div>
            </div>
        </div>






    </>
}
