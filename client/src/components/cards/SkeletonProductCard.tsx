
export default function SkeletonProductCard() {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col w-full animate-pulse">
            <div className="relative w-full h-48 sm:h-56 bg-gray-200 shrink-0">

                <div className="absolute top-3 left-3 bg-gray-300 h-6 w-20 rounded-md"></div>

                <div className="absolute bottom-3 right-3 bg-gray-300 h-6 w-12 rounded-md"></div>
            </div>

            <div className="p-4 flex flex-col flex-1">

                <div className="mb-4">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">

                    <div className="h-7 bg-gray-200 rounded-lg w-16"></div>

                    <div className="h-10 bg-gray-200 rounded-xl w-24"></div>
                </div>
            </div>
        </div>
    );
};
