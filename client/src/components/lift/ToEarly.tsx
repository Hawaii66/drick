import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export default function ToEarly() {
  return (
    <div className="flex justify-center items-center bg-[url(/bg/lift.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>You released your finger to early</CardTitle>
          <CardDescription>
            Wait for the page to turn green next time
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          <p>You will be penalized for this with 4000 ms time added</p>
        </CardContent>
      </Card>
    </div>
  );
}
