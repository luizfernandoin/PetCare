import { useState } from 'react';
import { useFormValidation } from '@/hooks/useFormValidation';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { createAppointment } from '@/services/appointments';
import { Service } from '@/types/service';
import { Pet } from '@/types/pet';
import { Clinic } from '@/types/clinic';
import { AppointmentCreate, appointmentSchema } from '@petcare/shared';
import { CreateAppointmentResponse } from '@/types/Appointment';
import { APPOINTMENT_STATUS } from '@petcare/shared/enums';

interface ModalAddAppointmentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    pets: Pet[];
    services: Service[];
    clinics: Clinic[];
    onClinicsRequest: (serviceId: string) => Promise<Clinic[]>;
    onAppointmentCreated: () => void;
}


export default function ModalAddAppointment({
    open,
    onOpenChange,
    pets,
    services,
    clinics,
    onAppointmentCreated
}: ModalAddAppointmentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingClinics] = useState(false);
    const [selectedClinicId, setSelectedClinicId] = useState('');
    console.log("MODAL CLINIC", clinics);
    

    const initialValues = {
        petId: '',
        serviceId: '',
        appointmentDate: new Date(),
        startTime: '09:00',
        endTime: '10:00',
        status: APPOINTMENT_STATUS.PENDING,
    };

    const {
        values,
        errors,
        handleChange,
        validateForm,
        isFormValid,
        setValues
    } = useFormValidation(initialValues, appointmentSchema);

    const handleServiceChange = async (serviceId: string) => {
        handleChange('serviceId', serviceId);
        setSelectedClinicId('');

        /* setIsLoadingClinics(true);
        try {
            await onClinicsRequest(serviceId);
        } catch (error) {
            console.error('Erro ao carregar clínicas:', error);
        } finally {
            setIsLoadingClinics(false);
        } */
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            handleChange('appointmentDate', date);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (!selectedClinicId) {
            alert("Selecione uma clínica");
            return;
        }

        setIsLoading(true);

        try {
            const appointmentData: AppointmentCreate = {
                petId: values.petId,
                serviceId: values.serviceId,
                appointmentDate: format(values.appointmentDate, "yyyy-MM-dd"),
                startTime: values.startTime,
                endTime: values.endTime,
                status: values.status,
            };


            const response: CreateAppointmentResponse = await createAppointment(appointmentData, selectedClinicId);

            if (!response || !response.data) {
                throw new Error("Falha ao criar agendamento");
            }

            onAppointmentCreated();
            onOpenChange(false);
            setValues(initialValues);
            setSelectedClinicId('');
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            alert("Erro ao criar agendamento. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onOpenChange(false);
        setValues(initialValues);
        setSelectedClinicId('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Novo Agendamento</DialogTitle>
                    <DialogDescription>
                        Preencha as informações para agendar um novo serviço.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="petId" className="text-sm font-medium">
                            Pet
                        </label>
                        <Select
                            value={values.petId}
                            onValueChange={(value) => handleChange('petId', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um pet" />
                            </SelectTrigger>
                            <SelectContent>
                                {pets.map((pet) => (
                                    <SelectItem key={pet.id} value={pet.id}>
                                        {pet.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.petId && (
                            <p className="text-sm text-red-500">{errors.petId}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="serviceId" className="text-sm font-medium">
                            Serviço
                        </label>
                        <Select
                            value={values.serviceId}
                            onValueChange={handleServiceChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um serviço" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id}>
                                        {service.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.serviceId && (
                            <p className="text-sm text-red-500">{errors.serviceId}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="clinicId" className="text-sm font-medium">
                            Clínica
                        </label>
                        <Select
                            value={selectedClinicId}
                            onValueChange={setSelectedClinicId}
                            disabled={isLoadingClinics || !values.serviceId}
                        >
                            <SelectTrigger>
                                {isLoadingClinics ? (
                                    <span>Carregando clínicas...</span>
                                ) : (
                                    <SelectValue placeholder={values.serviceId ? "Selecione uma clínica" : "Selecione um serviço primeiro"} />
                                )}
                            </SelectTrigger>
                            <SelectContent>
                                {clinics.map((clinic) => (
                                    <SelectItem key={clinic.id} value={clinic.id}>
                                        {clinic.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {!selectedClinicId && values.serviceId && (
                            <p className="text-sm text-red-500">Selecione uma clínica</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="appointmentDate" className="text-sm font-medium">
                            Data do Agendamento
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !values.appointmentDate && "text-muted-foreground"
                                    )}
                                >
                                    {values.appointmentDate ? (
                                        format(values.appointmentDate, "PPP", { locale: ptBR })
                                    ) : (
                                        <span>Selecione uma data</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={values.appointmentDate}
                                    onSelect={handleDateChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.appointmentDate && (
                            <p className="text-sm text-red-500">{errors.appointmentDate}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="startTime" className="text-sm font-medium">
                                Horário de Início
                            </label>
                            <Input
                                type="time"
                                value={values.startTime}
                                onChange={(e) => handleChange('startTime', e.target.value)}
                            />
                            {errors.startTime && (
                                <p className="text-sm text-red-500">{errors.startTime}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="endTime" className="text-sm font-medium">
                                Horário de Término
                            </label>
                            <Input
                                type="time"
                                value={values.endTime}
                                onChange={(e) => handleChange('endTime', e.target.value)}
                            />
                            {errors.endTime && (
                                <p className="text-sm text-red-500">{errors.endTime}</p>
                            )}
                        </div>
                    </div>

                    {/* <div className="space-y-2">
                        <label htmlFor="status" className="text-sm font-medium">
                            Status
                        </label>
                        <Select
                            value={values.status}
                            onValueChange={(value) => handleChange('status', value as APPOINTMENT_STATUS)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={APPOINTMENT_STATUS.PENDING}>Pendente</SelectItem>
                                <SelectItem value={APPOINTMENT_STATUS.CONFIRMED}>Confirmado</SelectItem>
                                <SelectItem value={APPOINTMENT_STATUS.CANCELED}>Cancelado</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && (
                            <p className="text-sm text-red-500">{errors.status}</p>
                        )}
                    </div> */}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !isFormValid() || !selectedClinicId}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Agendar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}