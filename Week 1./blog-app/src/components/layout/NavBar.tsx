import DarkModeButton from '../ui/DarkModeButton';
import { CgProfile } from "react-icons/cg";

// Move styles into a clean string
const linkStyles = "hover:text-indigo-500 transition-colors font-medium dark:text-gray-300 dark:hover:text-white";

const NavBar: React.FC = () => {
    return (
        <nav className="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
            
            {/* Left Section: Navigation Links */}
            <div className="flex items-center gap-4 md:gap-10">
                <a href="#home" className={linkStyles}>About</a>
                <a href="#blogs" className={linkStyles}>Blog</a>
            </div>

            {/* Right Section: Actions (Grouped Together) */}
            <div className="flex items-center gap-6">
                <DarkModeButton />
                
                <a href="/profile" className="text-gray-600 dark:text-gray-400 hover:scale-110 transition-transform text-gray-50">
                    <CgProfile size={28} />
                </a>
            </div>
        
        </nav>
    );
};

export default NavBar;