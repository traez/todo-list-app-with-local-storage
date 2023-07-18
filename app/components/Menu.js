/* the Menu component represents a menu container with an input field where users can enter new todos or chat entries. The component handles input changes, keydown events, and styling based on the color theme specified by the isDarkTheme prop. */
export default function Menu({
  handleChange,
  isDarkTheme,
  chatEntry,
  handleKeyDown,
}) {
  const shadeM = isDarkTheme ? "dark" : "lite";

  return (
    <menu className={`${shadeM}-menu`}>
      <div id="menu-cir" className={`${shadeM}-menu-cir`}></div>
      <input
        type="text"
        placeholder="Create a new todo..."
        id="menu-inp"
        className={`${shadeM}-menu-inp`}
        name="todo"
        value={chatEntry}
        onChange={handleChange}
        onKeyDown={(event) => handleKeyDown(event)}
      />
    </menu>
  );
}
