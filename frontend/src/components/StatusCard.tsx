interface StatusCardProps {
  title: string;
  count: number;
}

function StatusCard({ title, count }: StatusCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
}

export default StatusCard;