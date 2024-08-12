import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="h-[80vh] flex flex-1 items-center justify-center">
      <SignUp path="/sign-up" />
    </section>
  );
}
