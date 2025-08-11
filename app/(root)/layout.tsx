import Logout from "@/components/Logout";
import Image from "next/image";
import Link from "next/link";

const layout = ({children}: {children: React.ReactNode}) => {
  
 
  return (
   

    <div className="px-14 py-7 rounded">
        <nav className="flex flex-row justify-between shadow-2xl rounded py-2 border">
       <Link href="/" className='flex items-center gap-2'>
                    <Image src="/globe.svg"
                     alt='logo'
                     width={38}
                     height={32}
                     />
                     <h1 className='text-blue-700 ml-2'>Subscription</h1>
            </Link>
            <div className="flex items-center gap-4 px-4">
   <Logout />
            </div>
           
        </nav>
           {children}
        </div>
  )
}

export default layout