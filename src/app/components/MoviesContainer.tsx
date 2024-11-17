export default function MoviesContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 bg-gray-100 p-4 rounded w-full sm:w-3/4 h-full text-black">
      {children}
    </div>
  );
}
