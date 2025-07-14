import { AnimalCard } from "@/components/AnimalCard.tsx";
import { RequestCards } from "@/components/RequestCards.tsx";

export function PublicApp() {
  return (
    <>
      <h1 className="text-xl mb-8">Public Area</h1>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-6 min-w-80">
          <RequestCards />
          <div className="max-w-80">
            <AnimalCard type="cat" />
          </div>
        </div>
      </div>
    </>
  );
}
