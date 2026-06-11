export function NetworkStatus() {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-end gap-[1px]">
        <div className="h-1 w-[3px] rounded-full bg-green-500" />
        <div className="h-2 w-[3px] rounded-full bg-green-500" />
        <div className="h-3 w-[3px] rounded-full bg-green-500" />
        <div className="h-4 w-[3px] rounded-full bg-green-500" />
      </div>

      <span className="text-[9px] font-medium text-green-500">
        Good
      </span>
    </div>
  );
}