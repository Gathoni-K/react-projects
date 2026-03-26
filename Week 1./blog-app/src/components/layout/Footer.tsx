const linkStyles = "hover:text-indigo-500 transition-all duration-300 font-medium dark:text-gray-400 dark:hover:text-white hover:scale-105";

const Footer: React.FC = () => {
    return (
        <footer className="w-full py-12 px-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">

                {/* Top Layer: Branding & Links */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    {/* Brand Section */}
                    <div className="flex items-center gap-3">
                        <img 
                            src='/peak.jpg' 
                            className="rounded-full w-10 h-10 object-cover border border-gray-200 dark:border-gray-700" 
                            alt="Ripple Logo"
                        />
                        <h1 className="text-xl font-bold tracking-tight dark:text-white">
                            Ripple
                        </h1>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-8">
                        <a href="#home" className={linkStyles}>Home</a>
                        <a href="#blogs" className={linkStyles}>Blogs</a>
                        <a href="#about" className={linkStyles}>About</a>
                    </nav>
                </div>

                {/* Divider Line (Optional but classy) */}
                <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-800" />

                {/* Bottom Layer: Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} Ripple. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;