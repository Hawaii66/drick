import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  challenge: string;
};

export default function GroupChallenge({ challenge }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Group Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{challenge}</p>
      </CardContent>
    </Card>
  );
}
