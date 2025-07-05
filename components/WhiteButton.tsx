interface CustomButtonProps {
  name: string;
  onClick: () => void;
}
const WhiteButton = ({ name, onClick }: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative z-20 px-4 py-2 font-medium text-sm md:text-[16px] rounded-md text-black bg-white transition-all duration-200 cursor-pointer" 
    >
      {name}
    </button>
  )
}

export default WhiteButton