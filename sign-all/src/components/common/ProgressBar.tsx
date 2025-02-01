import React from "react";

interface ProgressBarProps {
    score: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ score }) => {
    const formattedScore = (score * 100).toFixed(2);
    const circumference = 60 * Math.PI;
    const percent = score * 100;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex items-center flex-wrap max-w-xs px-4 py-2 bg-white shadow-xl rounded-2xl h-16 w-64">
            <div className="flex items-center justify-center -m-4 overflow-hidden bg-white rounded-full">
                <svg
                    className="w-20 h-20 transform translate-x-1 translate-y-1"
                    aria-hidden="true"
                >
                    <circle
                        className="text-gray-300"
                        strokeWidth="6"
                        stroke="currentColor"
                        fill="transparent"
                        r="30"
                        cx="35"
                        cy="35"
                    />
                    <circle
                        className="text-lime-600"
                        strokeWidth="5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="30"
                        cx="35"
                        cy="35"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: offset,
                        }}
                    />
                </svg>
                <span className="absolute text-sm text-lime-700">{`${formattedScore}%`}</span>
            </div>
            <p className="ml-4 font-medium text-gray-600 text-sm">Accuracy Score</p>
            <span className="ml-auto text-lg font-medium text-lime-600 hidden sm:block">
                {formattedScore}
            </span>
        </div>
    );
};

export default ProgressBar;