import { Logo } from "@/components/atoms/logo";
import CardPet from "@/components/molecules/card-pet";
import { CardService } from "@/components/molecules/card-service";
import DatePickersGrid from "@/components/organisms/datePickersGrid";
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
      <div>
        <CardPet 
          name="Scooby-Doo" 
          image="https://images.pexels.com/photos/4681107/pexels-photo-4681107.jpeg"/> 
      </div>
      <div>
        <DatePickersGrid />
      </div>

      <div className="flex gap-4">
        <CardService type="grooming"/> 
        <CardService type="bath"/> 
        <CardService type="vaccination"/> 
      </div>

    </div>
  )
}
