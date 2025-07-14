import { Logo } from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Storybook() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <div>
        <Input placeholder="Email" />
      </div>
      <div>
        <Input placeholder="Password" />
      </div>
      <div>
        <Button>Signin</Button>
      </div>
      <div>
        <Logo />
      </div>

    </div>
  )
}
