import { RequestCard } from "@/components/RequestCard.tsx";

type RequestCardProps = {
  token?: string;
};

export function RequestCards({ token }: RequestCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <RequestCard type="public" token={token} />
      <RequestCard type="secured" token={token} />
    </div>
  );
}
