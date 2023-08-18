"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-c-blue-light text-white px-5 py-2 rounded-lg min-w-[180px]"
    >
      {pending ? "Adding..." : "Add comment"}
    </button>
  );
}
