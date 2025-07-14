import { AnimalCard } from "@/components/AnimalCard.tsx";
import { RequestCards } from "@/components/RequestCards.tsx";
import { JwtCards } from "@/components/JwtCards.tsx";

type SecuredAppProps = {
  token?: string;
};

export function SecuredApp({ token }: SecuredAppProps) {
  return (
    <>
      <h1 className="text-xl mb-8">Secured Area</h1>
      <div className="flex flex-row gap-6">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6 min-w-80">
            <RequestCards token={token} />
            <div className="max-w-80">
              <AnimalCard type="dog" />
            </div>
          </div>
        </div>
        <div className="min-w-80">
          <JwtCards token={token} />
        </div>
      </div>
    </>
  );
}
