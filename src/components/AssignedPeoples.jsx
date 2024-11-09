import PropTypes from "prop-types";

export default function AssignedPeoples({ text, people }) {
    return (
        <div className="flex gap-2.5 items-center">
            {text && (
                <div className="text-slate-700 text-sm font-inter font-semibold leading-tight">
                    {text}
                </div>
            )}
            <div className="flex">
                {people.map((data, index) => (
                    <div
                        style={{ zIndex: index * 1, left: `${-index * 8}px` }}
                        className="relative"
                        key={index}
                    >
                        <img
                            className="w-6 h-6 rounded-full border border-white"
                            src={data.image}
                            alt={data.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

AssignedPeoples.propTypes = {
    people: PropTypes.array,
    text: PropTypes.string,
};
