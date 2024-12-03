import { signOut,useSession } from "next-auth/react";
import Link from "next/link";
import { Gauge } from "lucide-react";

const TopBar = () => {
    const { data: session, status } = useSession();
  
    if (status === "loading") {
      return <p className="text-center text-gray-600">Loading...</p>;
    }
  
    if (status === "authenticated") {
      return (
        <div className="bg-gray-100 px-4 py-2 shadow-sm flex justify-between items-center">
          {/* Left Side (Dashboard Link) */}
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <span className="text-gray-800 flex items-center font-semibold leading-1 hover:text-blue-600">
                 <Gauge     className="me-2"/>
                Dashboard
              </span>
            </Link>
          </div>
  
          {/* Right Side (User Info and Logout Button) */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 font-medium text-sm">
              Welcome, {session.user.name}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-xs text-white py-1 px-4 rounded-full shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      );
    }
  
    return null;
  };
  
  export default TopBar;