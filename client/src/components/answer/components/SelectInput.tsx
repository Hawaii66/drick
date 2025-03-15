import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type Props = {
  selectable: { label: string; id: string }[];
  selected: string;
  onChange: (str: string) => void;
  label: string;
};

export default function AnswerSelectInput({
  label,
  onChange,
  selectable,
  selected,
}: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{label}</Label>
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue className="w-full" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectable.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
