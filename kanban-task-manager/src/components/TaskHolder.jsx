import PropTypes from "prop-types";

export default function TaskHolder({ headingText, snapshot, provided, children }) {
    const colorMapping = {
        Incomplete: "bg-red-600",
        "To Do": "bg-yellow-500",
        Doing: "bg-blue-500",
        "Under Review": "bg-purple-500",
        Completed: "bg-green-500",
        Overdue: "bg-orange-600",
    };

    const backgroundColorClass = colorMapping[headingText] || "bg-gray-500";
    return (
        <div className="rounded-lg min-h-[calc(90vh-70px) w-full">
            <div className="h-11 bg-gray-200 rounded-tl-lg rounded-tr-lg flex items-center justify-between p-3">
                <div className="flex items-center space-x-2">
                    <span className={`h-5 w-5 ${backgroundColorClass} rounded-l-full`}></span>
                    <span className="text-black font-inter">{headingText}</span>
                </div>
                <span className="text-gray-800 font-semibold">0</span>
            </div>
            <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${
                    snapshot.isDraggingOver
                        ? "bg-gray-200 border-gray-200 border-t-transparent"
                        : "bg-[#f0f0f1] border-gray-200"
                } border  h-[calc(85vh-70px)] overflow-y-auto overflow-x-hidden custom-Y-scrollbar mb-5 rounded-b-lg flex flex-col p-3 transition-colors relative`}
            >
                {children}
                {provided.placeholder}
            </div>
        </div>
    );
}

TaskHolder.propTypes = {
    headingText: PropTypes.string,
    snapshot: PropTypes.object,
    provided: PropTypes.any,
    children: PropTypes.any,
};
