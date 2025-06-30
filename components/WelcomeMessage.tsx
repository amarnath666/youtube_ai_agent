export default function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-10">
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-inset ring-gray-200 px-6 py-5 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Welcome to YTNotes Chat👋
        </h2>
        <p className="text-zinc-900 mt-4 leading-relaxed">
          Add your YouTube URL to get started.
        
        </p>
      </div>
    </div>
  );
}
