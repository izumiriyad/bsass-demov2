export default function Loading() {
  return (
    <div className="space-y-5 px-3 py-4 sm:px-5 sm:py-6" aria-label="Loading content">
      <div className="skeleton h-[190px] rounded-2xl sm:h-[260px] lg:h-[310px]" />
      <div className="skeleton h-12 rounded-full" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => <div key={i} className="skeleton aspect-[3/4] rounded-xl" />)}
      </div>
    </div>
  );
}
