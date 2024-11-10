import AssignedPeoples from "./AssignedPeoples";
import PropTypes from "prop-types";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";

export default function SingleTask({ data, provided, snapshot }) {
    const [date] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        const fetchAttachments = async () => {
            try {
                const response = await fetch("https://task-manager-oi52.onrender.com/attachments");
                if (response.ok) {
                    const result = await response.json();
                    setAttachments(result);
                } else {
                    console.error("Failed to fetch attachments: Server responded with error");
                }
            } catch (error) {
                console.error("Error fetching attachments:", error);
            }
        };
        fetchAttachments();
    }, []);

    const handleFileUpload = async (event) => {
        const files = Array.from(event.target.files);
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        try {
            const response = await fetch("https://task-manager-oi52.onrender.com//upload", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const result = await response.json();
                setAttachments((prevAttachments) => [...prevAttachments, ...result.attachments]);
            } else {
                console.error("Failed to upload files: Server responded with error");
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${
                snapshot.isDragging
                    ? "bg-slate-100 border-[2px]"
                    : "bg-white border border-gray-200"
            } rounded-lg shadow p-3 select-none transition-colors my-1.5 first-of-type:mt-0 last-of-type:mb-0 w-96`}
        >
            <div className="flex justify-between">
                <div className="text-slate-700 text-sm font-inter font-semibold leading-[18px] flex justify-between">
                    <img
                        className="w-6 h-6 mr-2 rounded-full border border-white"
                        src="https://mui.com/static/images/avatar/5.jpg"
                        alt="avatar"
                    />
                    {data.heading}
                </div>
                <div className="text-slate-700 text-sm font-inter font-semibold leading-[18px] flex justify-between">
                    <img
                        className="w-6 h-6 mr-2 rounded-full border border-white"
                        src="https://mui.com/static/images/avatar/2.jpg"
                        alt="avatar"
                    />
                    {data.subheading}
                </div>
            </div>
            <div className="text-slate-700 py-3 text-xs font-inter font-normal leading">
                {data.description}
            </div>

            <div className="flex items-center justify-between mt-4">
                <AssignedPeoples people={data.assignedPeople} />
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <img src="/assets/comment.png" alt="comment" className="w-6" />
                        <span className="text-slate-700 text-xs font-inter font-medium leading-none">
                            {data.comment}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={toggleModal}>
                        <img src="/assets/attachment.svg" alt="attachment" />
                        <span className="text-slate-700 text-xs font-inter font-medium leading-none">
                            {attachments.length}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <span className="text-slate-700 text-xs font-inter font-medium leading-none flex items-center justify-between gap-2">
                            <img src="/assets/calendar.png" alt="calendar" className="w-6" />
                            <span>
                                {date.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-lg font-semibold text-slate-700 mb-4">
                            Upload Attachments
                        </h3>
                        <input type="file" multiple onChange={handleFileUpload} className="mb-4" />
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 mb-4"
                            onClick={toggleModal}
                        >
                            Close
                        </button>
                        <ul className="text-slate-700 text-sm">
                            {attachments.map((attachment, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center py-1 border-b"
                                >
                                    <span>{attachment.name}</span>
                                    <span className="text-xs text-gray-500">
                                        {attachment.type.split("/")[1]}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

SingleTask.propTypes = {
    data: PropTypes.object.isRequired,
    provided: PropTypes.object,
    snapshot: PropTypes.object,
};
