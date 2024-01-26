import { ChangeEvent } from "react";
import Input from "@/components/input/Input";

export default function login() {
  return (
    <div>
      <Input
        type="email"
        value={""}
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Input
        type="password"
        value={""}
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
