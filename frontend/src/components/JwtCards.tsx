import { jwtDecode, type JwtHeader, type JwtPayload } from "jwt-decode";
import { JwtCard } from "@/components/JwtCard.tsx";

type JwtCardsProps = {
  token?: string;
};

export function JwtCards({ token }: JwtCardsProps) {
  const decodedHeader = token
    ? jwtDecode<JwtHeader>(token, { header: true })
    : undefined;
  const decodedPayload = token ? jwtDecode<JwtPayload>(token) : undefined;

  return (
    <div className="flex flex-col gap-6">
      {decodedHeader && <JwtCard title="Header" content={decodedHeader} />}
      {decodedPayload && <JwtCard title="Payload" content={decodedPayload} />}
    </div>
  );
}
