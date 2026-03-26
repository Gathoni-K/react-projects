import { useDarkMode } from '../../hooks/useDarkTheme';
import { CiSun } from "react-icons/ci";
import { LuMoon } from "react-icons/lu";

const ThemeToggle: React.FC = () => {
    const [theme, toggleTheme] = useDarkMode();

    return (
        <button
        onClick = {toggleTheme}
        className="dark:text-gray-50 text-gray-950 text-xl"
        >

            {theme === 'light' ? <LuMoon /> : <CiSun /> }

        </button>
    );
};

export default ThemeToggle;
