/* the Section component handles the rendering of the main section of the app, including the display of todo items, drag and drop functionality, and various buttons and icons for managing the todo items. It takes into account the color theme, active tab, selected items, and handles event interactions such as editing, deletion, and clearing completed items. */
export default function Section({
  isDarkTheme,
  contentArray,
  selectedDivs,
  handleSelectedDivs,
  activeTab,
  handleDelete,
  handleEdit,
  handleClear,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) {
  const shadeS = isDarkTheme ? "dark" : "lite";

  let displayedArray;
  if (activeTab === "completed") {
    displayedArray = contentArray.filter((entry) =>
      selectedDivs.includes(entry.timeStamp)
    );
  } else if (activeTab === "active") {
    displayedArray = contentArray.filter(
      (entry) => !selectedDivs.includes(entry.timeStamp)
    );
  } else {
    displayedArray = contentArray;
  }

  return (
    <section>
      <div id="sec-div">
        {displayedArray.map((entry, index) => {
          const isCheckedS = selectedDivs.includes(entry.timeStamp)
            ? ["icon-check-on", "h2-check-on"]
            : ["icon-check-off", "h2-check-off"];
          return (
            <article
              className={`${shadeS}-article`}
              key={entry.timeStamp}
              draggable
              onDragStart={(event) =>
                handleDragStart(event, entry.timeStamp, entry.chatEntry)
              }
              onDragOver={handleDragOver}
              onDrop={(event) =>
                handleDrop(event, entry.timeStamp, entry.chatEntry)
              }
            >
              <div
                className={`${shadeS}-art-div-check`}
                onClick={() => handleSelectedDivs(entry.timeStamp)}
              >
                <img
                  src="./images/icon-check.svg"
                  className={`${isCheckedS[0]}`}
                  alt=""
                />
              </div>
              <h2 className={`${isCheckedS[1]}`}>{entry.chatEntry}</h2>
              <div
                className={`art-div-edit ${shadeS}-icon-edit`}
                onClick={() => handleEdit(entry)}
              ></div>
              <div
                className={`art-div-cross ${shadeS}-icon-cross`}
                onClick={() => handleDelete(index)}
              ></div>
            </article>
          );
        })}
      </div>
      <aside className={`${shadeS}-aside`}>
        <div id="aside-left">
          <span>{displayedArray.length}</span> items left
        </div>
        <div id="aside-clear" onClick={handleClear}>
          Clear Completed
        </div>
      </aside>
    </section>
  );
}
