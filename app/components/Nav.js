/* the Nav component represents a navigation bar with tabs that allow the user to switch between different views or categories in the chat application. The active tab is determined by the activeTab prop, and the handleTabClick function is invoked when a tab is clicked, allowing for the selection of different tabs and triggering the associated functionality within the application. */
export default function Nav({ isDarkTheme, activeTab, handleTabClick }) {
  const shadeN = isDarkTheme ? "dark" : "lite";
  return (
    <nav className={`${shadeN}-nav`}>
      <div
        id="nav-all"
        className={`${activeTab === "all" ? "active" : ""} nav-div`}
        onClick={() => handleTabClick("all")}
      >
        All
      </div>
      <div
        id="nav-act"
        className={`${activeTab === "active" ? "active" : ""} nav-div`}
        onClick={() => handleTabClick("active")}
      >
        Active
      </div>
      <div
        id="nav-com"
        className={`${activeTab === "completed" ? "active" : ""} nav-div`}
        onClick={() => handleTabClick("completed")}
      >
        Completed
      </div>
    </nav>
  );
}


