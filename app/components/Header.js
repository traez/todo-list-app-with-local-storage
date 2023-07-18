/* the Header component represents the header section of the application, displaying the title and a theme toggle button. The theme toggle button allows users to switch between light and dark themes by invoking the toggleTheme function. */
export default function Header({ toggleTheme, isDarkTheme }) {

  return (
    <header>
      <h1>TODO</h1>
      <div
        id="head-div"
        className={isDarkTheme ? "dark-icon-sun" : "lite-icon-moon"}
        onClick={toggleTheme}
      ></div>
    </header>
  );
}
