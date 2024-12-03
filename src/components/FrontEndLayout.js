import Header from "./Header";
import Footer from "./Footer";

export default function FrontEndLayout({ children }) {
    return (
        <>
            <Header />
             {children} 
            <Footer />
        </>
    );
}