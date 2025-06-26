interface CustomButtonProps {
  name: string;
  onClick: () => void;
}
const CustomButton = ({ name, onClick }: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative z-20 px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] hover:shadow-lg transition-all duration-200 cursor-pointer "
    >
      {name}
    </button>
  )
}

export default CustomButton