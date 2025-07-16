import { Appointment } from "@/types/Appointment";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";

type Props = {
    appointment: Appointment | null;
    onClose: () => void;
    onSave: (updated: Appointment) => void;
};

export function AppointmentModal({ appointment, onClose, onSave }: Props) {
    const [formData, setFormData] = useState<Appointment | null>(null);

    useEffect(() => {
        setFormData(appointment);
    }, [appointment]);

    if (!formData) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : prev);
    };

    const handleStatusChange = (value: Appointment["status"]) => {
        setFormData(prev => prev ? { ...prev, status: value } : prev);
    };

    const handleSave = () => {
        if (formData) {
            onSave(formData);
            onClose();
        }
    };

    return (
        <Dialog open={!!appointment} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Editar Agendamento</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <Label htmlFor="tutor">Tutor</Label>
                        <Input id="tutor" name="tutor" value={formData.tutor} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="pet">Pet</Label>
                        <Input id="pet" name="pet" value={formData.pet} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="servico">Serviço</Label>
                        <Input id="servico" name="servico" value={formData.servico} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="clinica">Clínica</Label>
                        <Input id="clinica" name="clinica" value={formData.clinica} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="data">Data</Label>
                        <Input id="data" name="data" type="date" value={formData.data} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="horarioInicio">Início</Label>
                        <Input id="horarioInicio" name="horarioInicio" value={formData.horarioInicio} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="horarioFim">Fim</Label>
                        <Input id="horarioFim" name="horarioFim" value={formData.horarioFim} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Select value={formData.status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pendente">Pendente</SelectItem>
                                <SelectItem value="concluído">Concluído</SelectItem>
                                <SelectItem value="cancelado">Cancelado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <Button onClick={handleSave}>Salvar</Button>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
