const UserStatsCard = ({
  title,
  count,
  icon: Icon,
  color,
  loading,
}: {
  title: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  loading?: boolean;
}) => (
  <div className={`rounded-lg border p-6 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {loading ? (
          <div className="mt-2 h-8 w-10 animate-pulse rounded bg-blue-400 font-bold" />
        ) : (
          <h3 className="mt-2 text-2xl font-bold">{count}</h3>
        )}
      </div>
      <Icon className="h-8 w-8 text-gray-500" />
    </div>
  </div>
);

export default UserStatsCard;
