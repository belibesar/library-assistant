interface SettingsHeaderProps{
    title:string;
    description:string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title, description }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    <p className="mt-1 text-sm text-gray-600">{description}</p>
  </div>
);

export default SettingsHeader;
