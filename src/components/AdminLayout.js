import AdminHeader from "./admin/Header";
import AdminFooter from "./admin/Footer";


export default function AdminLayout({ children }) {
    return (
        <>
            <AdminHeader />
            {children}
            <AdminFooter />
        </>
    );
}
