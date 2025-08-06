import { JSX } from "react";

const SectionHeader = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) => (
  <div className="mb-4 flex items-start gap-3 rounded-lg bg-gray-50 p-4">
    <div className="mt-0.5 rounded-full bg-blue-100 p-2">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default SectionHeader;