/* import necessary dependencies from the React library and specific components from local files */
"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Section from "./components/Section";
import Nav from "./components/Nav";
import Footer from "./components/Footer";


export default function Home() {
  /*  initializes and sets up multiple states using the useState hook, which will be used to manage various aspects of the chat application's functionality and UI. */
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [chatEntry, setChatEntry] = useState("");
  const [contentArray, setContentArray] = useState([]);
  const [selectedDivs, setSelectedDivs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  /*  determines the value of the shade variable based on the value of the isDarkTheme state. It allows for applying different styles or classes in the UI based on whether the dark theme or the light theme is active. */
  const shade = isDarkTheme ? "dark" : "lite";

  /*  this useEffect hook is responsible for initializing the contentArray and selectedDivs states by retrieving their values from localStorage if available. If the values are not found, the hook sets initial values and stores them in localStorage for future use. */
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedItems = localStorage.getItem("items");
      if (storedItems) {
        setContentArray(JSON.parse(storedItems));
      } else {
        // If "items" do not exist, set an array with two initial items
        const initialItems = [
          { chatEntry: "Jog around the field X3", timeStamp: "Timestamp 1" },
          { chatEntry: "Code everyday", timeStamp: "Timestamp 2" },
          {
            chatEntry: "Trevor's college fund daily saving",
            timeStamp: "Timestamp 3",
          },
        ];
        setContentArray(initialItems);
        // Store the initialItems in localStorage
        localStorage.setItem("items", JSON.stringify(initialItems));
      }

      const storedSelectedDivs = localStorage.getItem("selectedDivs");
      if (storedSelectedDivs) {
        setSelectedDivs(JSON.parse(storedSelectedDivs));
      }
    }
  }, []);

  /* this useEffect hook ensures that the contentArray and selectedDivs states are stored and updated in localStorage whenever their values change. This allows the chat application's data to persist across page reloads or when the user navigates away from the page. */
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("items", JSON.stringify(contentArray));
      localStorage.setItem("selectedDivs", JSON.stringify(selectedDivs));
    }
  }, [contentArray, selectedDivs]);

  /* This function is used in response to a user action. It powers the toggle button to switch between a dark and light theme in the application. */
  function toggleTheme() {
    setIsDarkTheme((prevState) => !prevState);
  }

  /* the handleChange function is responsible for updating the chatEntry state whenever the value of an input field changes. It captures the new value from the event.target.value property and updates the state using the setChatEntry function. */
  function handleChange(event) {
    const { value } = event.target;
    setChatEntry(value);
  }

  /* the handleEdit function is responsible for handling the editing of chat entries. It prompts the user for an edited entry, updates the contentArray state with the edited entry, and stores the updated array in localStorage if available. */
  function handleEdit(entry) {
    const editedEntry = prompt("Edit the entry:", entry.chatEntry);
    if (editedEntry !== null) {
      const editedContentArray = contentArray.map((item) => {
        if (item.timeStamp === entry.timeStamp) {
          return { ...item, chatEntry: editedEntry };
        }
        return item;
      });

      setContentArray(editedContentArray);

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("items", JSON.stringify(editedContentArray));
      }
    }
  }

/* the handleSubmit function is responsible for handling the submission of chat entries. It creates a new chat entry object with the user's input and a timestamp, adds it to the existing contentArray state, stores the updated array in localStorage (if available), and resets the chatEntry state to an empty string */
  function handleSubmit() {
    const chatEntryInfo = {
      chatEntry: chatEntry,
      timeStamp: `${new Date().toLocaleTimeString()} ${new Date().toDateString()}`,
    };
    setContentArray([...contentArray, chatEntryInfo]);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        "items",
        JSON.stringify([...contentArray, chatEntryInfo])
      );
    }
    setChatEntry("");
  }

/* the handleKeyDown function serves as an event handler for keyboard events, specifically when a key is pressed. It checks if the Enter key was pressed without the Shift key and, if so, calls the handleSubmit function to handle the submission of the chat entry. */
  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit();
    }
  }

/* the handleSelectedDivs function is responsible for handling the selection and deselection of chat entries. It updates the selectedDivs state based on whether the key value is already included in the state or not. This function is typically used as an event handler when a user selects or deselects a chat entry in the chat application. */
  function handleSelectedDivs(key) {
    if (selectedDivs.includes(key)) {
      setSelectedDivs(selectedDivs.filter((i) => i !== key));
    } else {
      setSelectedDivs([...selectedDivs, key]);
    }
  }

/* the handleTabClick function is responsible for updating the activeTab state when a tab is clicked or selected. It sets the activeTab state to the value of the clicked tab, triggering the necessary UI updates in the chat application. */
  function handleTabClick(tab) {
    setActiveTab(tab);
  }

/* the handleDelete function is responsible for handling the deletion of chat entries. It removes the entry from the contentArray state, updates the selectedDivs state, and updates the corresponding values in localStorage if available. */
  function handleDelete(index) {
    const newContentArray = [...contentArray];
    const deletedEntry = newContentArray.splice(index, 1)[0];
    setContentArray(newContentArray);

    setSelectedDivs(
      selectedDivs.filter((key) => key !== deletedEntry.timeStamp)
    );

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("items", JSON.stringify(newContentArray));
      localStorage.setItem("selectedDivs", JSON.stringify(selectedDivs));
    }
  }

/* the handleClear function is responsible for clearing or deleting selected chat entries. It filters the contentArray state to remove the selected entries, updates the selectedDivs state to deselect all chat entries, and updates the corresponding values in localStorage if available. */
  function handleClear() {
    setContentArray(
      contentArray.filter((entry) => !selectedDivs.includes(entry.timeStamp))
    );

    setSelectedDivs([]);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("items", JSON.stringify(contentArray));
      localStorage.setItem("selectedDivs", JSON.stringify(selectedDivs));
    }
  }

/* the handleDragOver function is responsible for preventing the default behavior of the dragover event. This allows for custom handling of the drag and drop behavior in the chat application, as specified by the rest of the code */
  function handleDragOver(event) {
    event.preventDefault();
  }

/* the handleDragStart function is responsible for setting the data to be transferred during a drag and drop operation. It serializes an object containing the timeStamp and chatEntry values and sets it as the data in the dataTransfer property of the event object. This allows the dragged data to be accessed and utilized when it is dropped onto a target element. */
  function handleDragStart(event, timeStamp, chatEntry) {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ timeStamp, chatEntry })
    );
  }

/*  the handleDrop function is responsible for handling the drop event during a drag and drop operation. It retrieves the dragged data, finds the source and target entries within the contentArray state, removes the source entry from the array, inserts it at the target index, updates the contentArray state, and stores the updated array in localStorage if available. */
  function handleDrop(event, targetTimeStamp, targetChatEntry) {
    event.preventDefault();
    const sourceData = JSON.parse(event.dataTransfer.getData("text/plain"));
    const sourceTimeStamp = sourceData.timeStamp;
    const sourceChatEntry = sourceData.chatEntry;

    const sourceEntry = contentArray.find(
      (entry) => entry.timeStamp === sourceTimeStamp
    );

    const targetEntry = contentArray.find(
      (entry) => entry.timeStamp === targetTimeStamp
    );

    const sourceIndex = contentArray.indexOf(sourceEntry);
    const targetIndex = contentArray.indexOf(targetEntry);

    const updatedArray = contentArray.filter(
      (entry) => entry.timeStamp !== sourceTimeStamp
    );

    updatedArray.splice(targetIndex, 0, {
      chatEntry: sourceChatEntry,
      timeStamp: sourceTimeStamp,
    });

    setContentArray(updatedArray);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("items", JSON.stringify(updatedArray));
    }
  }

  return (
    <div id="root" className={`${shade}-body`}>
      <main>
        <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <Menu
          handleChange={handleChange}
          isDarkTheme={isDarkTheme}
          chatEntry={chatEntry}
          handleKeyDown={handleKeyDown}
        />
        <Section
          isDarkTheme={isDarkTheme}
          contentArray={contentArray}
          selectedDivs={selectedDivs}
          handleSelectedDivs={handleSelectedDivs}
          activeTab={activeTab}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleClear={handleClear}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
        <Nav
          isDarkTheme={isDarkTheme}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
        />
        <Footer />
      </main>
    </div>
  );
}
