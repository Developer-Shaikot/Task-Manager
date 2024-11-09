import { useImmer } from "use-immer";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import SingleTask from "./SingleTask";
import TaskHolder from "./TaskHolder";

const people = [
    { name: "Luke", image: "https://mui.com/static/images/avatar/2.jpg" },
    { name: "Harry", image: "https://mui.com/static/images/avatar/1.jpg" },
    { name: "John", image: "https://mui.com/static/images/avatar/5.jpg" },
];

const allTasks = [
    {
        text: "Incomplete",
        color: "Red",
        id: "incomplete",
        cards: [
            {
                _id: "c-101",
                category: "incomplete",
                heading: "John Doe", // Example person's name as heading
                subheading: "Jane Smith", // Example person's name as subheading
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                labels: [{ title: "Critical", type: "error" }, { title: "Client" }],
                assignedPeople: people,
                comment: 3,
                attachment: 4,
            },
            {
                _id: "c-102",
                category: "incomplete",
                heading: "Alice Brown",
                subheading: "Bob Johnson",
                description: "Gather initial requirements for the client...",
                labels: [{ title: "Urgent", type: "error" }],
                assignedPeople: people,
                comment: 1,
                attachment: 2,
            },
        ],
    },
    {
        text: "To Do",
        color: "Cyan",
        id: "todo",
        cards: [
            {
                _id: "c-103",
                category: "todo",
                heading: "Emily White",
                subheading: "Michael Green",
                description: "Create initial design mockups for client review...",
                labels: [{ title: "High", type: "error" }, { title: "Design" }],
                assignedPeople: people,
                comment: 2,
                attachment: 1,
            },
            {
                _id: "c-104",
                category: "todo",
                heading: "Sophia Black",
                subheading: "Liam Davis",
                description: "Schedule and conduct a meeting with the client...",
                labels: [{ title: "Moderate", type: "warning" }],
                assignedPeople: people,
                comment: 5,
                attachment: 3,
            },
            {
                _id: "c-105",
                category: "todo",
                heading: "Daniel Harris",
                subheading: "Olivia Moore",
                description: "Review the latest pull requests for feedback...",
                labels: [
                    { title: "Code", type: "info" },
                    { title: "High", type: "error" },
                ],
                assignedPeople: people,
                comment: 3,
                attachment: 0,
            },
            {
                _id: "c-106",
                category: "todo",
                heading: "James Wilson",
                subheading: "Isabella Lee",
                description: "Update project documentation with recent changes...",
                labels: [{ title: "Documentation", type: "info" }],
                assignedPeople: people,
                comment: 0,
                attachment: 2,
            },
            {
                _id: "c-107",
                category: "todo",
                heading: "Charlotte Martinez",
                subheading: "Henry Clark",
                description: "Fix critical bugs reported by the QA team...",
                labels: [{ title: "Urgent", type: "error" }, { title: "Bug" }],
                assignedPeople: people,
                comment: 4,
                attachment: 1,
            },
            {
                _id: "c-108",
                category: "todo",
                heading: "Lucas Hall",
                subheading: "Ava Allen",
                description: "Install dependencies and set up the development environment...",
                labels: [{ title: "Setup", type: "info" }],
                assignedPeople: people,
                comment: 1,
                attachment: 0,
            },
            {
                _id: "c-109",
                category: "todo",
                heading: "Mason Young",
                subheading: "Lily King",
                description: "Analyze recent user feedback to identify improvement areas...",
                labels: [{ title: "Moderate", type: "warning" }, { title: "Analysis" }],
                assignedPeople: people,
                comment: 3,
                attachment: 2,
            },
        ],
    },
    {
        text: "Doing",
        color: "Yellow",
        id: "doing",
        cards: [
            {
                _id: "c-105",
                category: "doing",
                heading: "David Scott",
                subheading: "Ella Robinson",
                description: "Develop REST API endpoints for client integration...",
                labels: [{ title: "Moderate", type: "success" }, { title: "Backend" }],
                assignedPeople: people,
                comment: 4,
                attachment: 6,
            },
            {
                _id: "c-106",
                category: "doing",
                heading: "Mia Lewis",
                subheading: "Ethan Walker",
                description: "Conduct a review of the current UI/UX designs...",
                labels: [{ title: "High", type: "error" }],
                assignedPeople: people,
                comment: 3,
                attachment: 4,
            },
        ],
    },
    {
        text: "Under Review",
        id: "under-review",
        cards: [
            {
                _id: "c-107",
                category: "under-review",
                heading: "Grace Martinez",
                subheading: "Jack Robinson",
                description: "Review the frontend code for compliance with standards...",
                labels: [{ title: "Review", type: "info" }],
                assignedPeople: people,
                comment: 2,
                attachment: 0,
            },
            {
                _id: "c-108",
                category: "under-review",
                heading: "Benjamin Clark",
                subheading: "Charlotte Allen",
                description: "Test the performance of the application under load...",
                labels: [{ title: "Testing", type: "success" }],
                assignedPeople: people,
                comment: 3,
                attachment: 2,
            },
        ],
    },
    {
        text: "Completed",
        id: "completed",
        cards: [
            {
                _id: "c-109",
                category: "completed",
                heading: "Amelia Turner",
                subheading: "Aidan Wilson",
                description: "Deploy the project to the client’s server...",
                labels: [{ title: "High", type: "success" }, { title: "Deployment" }],
                assignedPeople: people,
                comment: 0,
                attachment: 5,
            },
            {
                _id: "c-110",
                category: "completed",
                heading: "Isabella Walker",
                subheading: "Oliver Young",
                description: "Create and deliver user documentation to the client...",
                labels: [{ title: "Documentation", type: "info" }],
                assignedPeople: people,
                comment: 0,
                attachment: 3,
            },
        ],
    },
    {
        text: "Overdue",
        id: "overdue",
        cards: [
            {
                _id: "c-111",
                category: "overdue",
                heading: "Sophia Evans",
                subheading: "Daniel Harris",
                description: "Fix critical bugs in the payment gateway integration...",
                labels: [{ title: "Critical", type: "error" }],
                assignedPeople: people,
                comment: 6,
                attachment: 1,
            },
            {
                _id: "c-112",
                category: "overdue",
                heading: "Jackson Scott",
                subheading: "Lily Thompson",
                description: "Follow up on feedback provided by the client...",
                labels: [{ title: "High Priority", type: "warning" }],
                assignedPeople: people,
                comment: 3,
                attachment: 2,
            },
        ],
    },
];

export default function Tasks() {
    const [tasks, setTasks] = useImmer(allTasks);

    const handleDragEndContext = (result) => {
        const { destination, source } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        setTasks((draft) => {
            const sourceDroppableId = result.source.droppableId;
            const destinationDroppableId = result.destination.droppableId;

            if (sourceDroppableId === destinationDroppableId) {
                const column = draft.find((task) => task.id === sourceDroppableId);
                const [movedCard] = column.cards.splice(result.source.index, 1);
                column.cards.splice(result.destination.index, 0, movedCard);
            } else {
                const sourceColumn = draft.find((task) => task.id === sourceDroppableId);
                const destinationColumn = draft.find((task) => task.id === destinationDroppableId);
                const [movedCard] = sourceColumn.cards.splice(result.source.index, 1);
                destinationColumn.cards.splice(result.destination.index, 0, movedCard);
            }
        });
    };

    return (
        <main className="flex gap-1 font-public-sans lg:gap-8 md:gap-4 sm:gap-2 m-5 pb-1">
            <DragDropContext onDragEnd={handleDragEndContext}>
                {tasks.map((task) => (
                    <StrictModeDroppable droppableId={task.id} key={task.id} type="column">
                        {(provided, snapshot) => (
                            <TaskHolder
                                headingText={task?.text}
                                snapshot={snapshot}
                                provided={provided}
                            >
                                {task.cards?.map((card, index) => (
                                    <Draggable key={card._id} draggableId={card._id} index={index}>
                                        {(provided, snapshot) => (
                                            <SingleTask
                                                provided={provided}
                                                data={card}
                                                snapshot={snapshot}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                            </TaskHolder>
                        )}
                    </StrictModeDroppable>
                ))}
            </DragDropContext>
        </main>
    );
}
