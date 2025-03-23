import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  releaseTime: number;
};

export default function Released({ releaseTime }: Props) {
  return (
    <div className="flex justify-center items-center bg-[url(/bg/lift.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>You released your finger</CardTitle>
          <CardDescription>
            A normal human reaction time is between 200 - 1000 ms
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <p>You released your finger in</p>
          <p className="font-bold text-lg">{releaseTime} ms</p>
        </CardContent>
      </Card>
    </div>
  );
}
