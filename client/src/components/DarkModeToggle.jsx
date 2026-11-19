import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function DarkModeToggle() {

const { darkMode, setDarkMode } = useContext(ThemeContext);

return (
    
<button
  className="bg-gray-700 text-white px-4 py-2 rounded"

  onClick={() => {

    console.log("Before:", darkMode);

    setDarkMode((prev) => {

      console.log("Previous state:", prev);

      return !prev;

    });

  }}

>

  {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}

</button>

);

}

export default DarkModeToggle;