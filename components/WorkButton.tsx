export default function WorkButton() {
  return (
    <button className="group relative overflow-hidden rounded-full bg-white px-14 py-4 text-lg transition-all">
      <span className="absolute bottom-0 left-0 h-48 w-full origin-bottom translate-y-full transform overflow-hidden rounded-full bg-white/15 transition-all duration-300 ease-out group-hover:translate-y-14"></span>
      <span className="font-semibold text-black">Work with us</span>
    </button>
  );
}
