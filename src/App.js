import React from "react";
import Tasks from "./components/Tasks";

function App() {
    return (
        <div className="flex overflow-x-auto overflow-y-hidden custom-scrollbar m-12 ">
            <Tasks />
        </div>
    );
}

export default App;
