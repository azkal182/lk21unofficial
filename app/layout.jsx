import './globals.css'
import { Inter } from '@next/font/google'
import Navbar from '../components/Navbar'
import Navmobile from '../components/Navmobile'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body className={inter.className}>
                <Navbar />
                <main className='scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
                    {children}
                </main>

                <Navmobile />
                <Footer />
            </body>
        </html>
    )
}
