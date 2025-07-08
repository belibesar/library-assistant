import { HeroSectionProps } from "@/libs/types";
import Button from "./Button";

export default function Hero({
  heroTitle,
  heroDescription,
  buttonPrimary,
  buttonSecondary,
  span,
}: HeroSectionProps) {
  return (
    <div className="hero min-h-screen bg-blue-100">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
          {heroTitle}
          <span className="text-blue-600">{span}</span>
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
          {heroDescription}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button className="btn btn-info" buttonName={buttonPrimary} />
          <Button
            className="btn btn-soft btn-primary"
            buttonName={buttonSecondary}
          />
        </div>
      </div>
    </div>
  );
}
