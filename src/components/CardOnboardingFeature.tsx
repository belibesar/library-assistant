import { CardOnboardingFeatureProps } from "@/libs/types";

export default function CardOnboardingFeature({
  icon,
  cardTitle,
  description,
}: CardOnboardingFeatureProps) {
  return (
    <div className="card card-border bg-base-100 max-w-96 border-gray-200 transition-shadow hover:shadow-lg">
      <div className="card-body">
        {icon}
        <h2 className="card-title font-bold">{cardTitle}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
