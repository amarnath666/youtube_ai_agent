const Badge = ({ name, color }: { name: string; color: string }) => {
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {name}
    </div>
  );
};

export default Badge;