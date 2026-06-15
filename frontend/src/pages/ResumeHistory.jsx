<div className="min-h-screen bg-gray-100">

    <Navbar />

    <div className="p-4 sm:p-6 md:p-8">

        <h1 className="
            text-3xl
            sm:text-4xl
            font-bold
            mb-8
        ">
            Resume History
        </h1>

        {loading ? (

            <div className="flex justify-center py-20">
                <p className="text-lg">
                    Loading...
                </p>
            </div>

        ) : analyses.length === 0 ? (

            <div className="
                bg-white
                p-8
                rounded-xl
                shadow
                text-center
            ">
                No analyses found.
            </div>

        ) : (

            <div className="grid gap-6">

                {analyses.map(
                    (analysis) => (

                        <div
                            key={analysis._id}
                            className="
                                bg-white
                                p-4
                                sm:p-6
                                rounded-xl
                                shadow
                            "
                        >

                            {/* Header */}
                            <div className="
                                flex
                                flex-col
                                sm:flex-row
                                sm:justify-between
                                sm:items-start
                                gap-4
                            ">

                                <div className="min-w-0">

                                    <h2 className="
                                        text-lg
                                        sm:text-xl
                                        font-bold
                                        break-words
                                    ">
                                        {
                                            analysis.resumeName ||
                                            "Resume"
                                        }
                                    </h2>

                                    <p className="
                                        text-gray-500
                                        mt-1
                                        text-sm
                                    ">
                                        {
                                            new Date(
                                                analysis.createdAt
                                            ).toLocaleString()
                                        }
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        deleteAnalysis(
                                            analysis._id
                                        )
                                    }
                                    className="
                                        bg-red-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                        hover:bg-red-600
                                        w-full
                                        sm:w-auto
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                            {/* Scores */}
                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-4
                                mt-5
                            ">

                                <div className="
                                    bg-purple-100
                                    p-4
                                    rounded-lg
                                    text-center
                                ">
                                    <p className="text-gray-600">
                                        ATS Score
                                    </p>

                                    <p className="
                                        text-3xl
                                        font-bold
                                        text-purple-700
                                    ">
                                        {
                                            analysis.aiFeedback?.atsScore || 0
                                        }%
                                    </p>
                                </div>

                                <div className="
                                    bg-green-100
                                    p-4
                                    rounded-lg
                                    text-center
                                ">
                                    <p className="text-gray-600">
                                        Job Match Score
                                    </p>

                                    <p className="
                                        text-3xl
                                        font-bold
                                        text-green-700
                                    ">
                                        {
                                            analysis.aiFeedback?.jobMatchScore || 0
                                        }%
                                    </p>
                                </div>

                            </div>

                            {/* Summary */}
                            <div className="mt-5">

                                <h3 className="
                                    font-bold
                                    mb-2
                                    text-lg
                                ">
                                    Summary
                                </h3>

                                <p className="
                                    text-gray-700
                                    leading-7
                                    break-words
                                ">
                                    {
                                        analysis.aiFeedback?.summary ||
                                        "No summary available"
                                    }
                                </p>

                            </div>

                        </div>
                    )
                )}

            </div>
        )}

    </div>

</div>