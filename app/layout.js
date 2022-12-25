import '../styles/globals.css'
import { Inter } from '@next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({ children }) {
    return (
        <html>
            <head />
            <body
                className={`${inter.className} bg-black text-white`}
            >
                <Navbar />
                <main className='mt-2'>{children}</main>
            </body>
        </html>
    )
}
