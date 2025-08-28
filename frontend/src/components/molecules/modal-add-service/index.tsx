
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import { useFormValidation } from "@/hooks/useFormValidation";
import { serviceSchema, ServiceCreate } from "@petcare/shared";
import { SERVICE_TYPE } from "@petcare/shared/enums";
import { createService } from "@/services/service";

interface props {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalAddService({ open, setOpen }: props) {



  const {
    values: service,
    errors,
    setErrors,
    handleChange,
    validateForm,
    isFormValid,
    setValues
  } = useFormValidation<ServiceCreate>({
    name: "",
    type: SERVICE_TYPE.GROOMING,
    description: "",
  }, serviceSchema);


  const clearValues = () => {
    setValues({
      name: "",
      type: SERVICE_TYPE.GROOMING,
      description: "",
    });

    setErrors({});
  }

  useEffect(() => {
    if (!open) {
      clearValues();
    }
  }, [open, setValues]);


  const handleSave = async () => {
    if (!validateForm()) return;
    const newService = await createService({
      name: service.name,
      type: service.type,
      description: service.description,
    })

    if (newService) {
      setOpen(false);
    }

    clearValues();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Serviço</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para cadastrar um novo serviço.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Input
              placeholder="Nome"
              value={service.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input
              placeholder="Descrição"
              value={service.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div>
            <select
              defaultValue={SERVICE_TYPE.GROOMING}
              onChange={(e) => handleChange("type", e.target.value as SERVICE_TYPE)}
              className="w-full p-2 border rounded"
            >
              {
                Object.values(SERVICE_TYPE).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))
              }
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>

          <Button
            onClick={handleSave}
            disabled={!isFormValid()}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
