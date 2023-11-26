export default function LoadingDashboardPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-80 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-64 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-80 mb-2"></div>
            </div>
        </div>
    );
};
