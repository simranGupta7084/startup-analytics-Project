function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-300">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
      <span>{label}</span>
    </div>
  );
}

export default Loader;
