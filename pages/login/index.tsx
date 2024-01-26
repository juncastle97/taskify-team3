import { ChangeEvent } from "react";
import Input from "@/components/input/Input";

export default function login() {
  return (
    <div>
      <Input
        type="email"
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {}}
      />
      <Input
        type="password"
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {}}
      />
    </div>
  );
}
