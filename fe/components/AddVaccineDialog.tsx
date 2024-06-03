import {useState} from "react";
import {instance} from "@/lib/utils";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import DatePicker from "@/components/ui/DatePicker";
import {useToast} from "@/components/ui/use-toast";

export default function AddVaccineDialog(props: any) {
    const { id, petData, setPetData } = props;
    const {toast} = useToast();
    const [vaccineData, setVaccineData] = useState<any>({});
    const [datePicker, setDatePicker] = useState<Date | null>(null);
    const handleSubmit = async () => {
        try {
            await instance.post(`/pets/${id}/vaccine`, {
                ...vaccineData,
                dateAdministered: datePicker
            });
        } catch (e) {
            toast({
                title: 'Error creating allergy record',
                variant: "destructive"
            });
        }
        setPetData({
            ...petData,
            vaccines: [
                ...petData.vaccines,
                vaccineData,
            ]
        })
    }
    const isButtonDisabled = !vaccineData.name || !datePicker;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Vaccine</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add vaccine information for your pet</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Vaccine Name
                    </Label>
                    <Input
                        id="name"
                        className="col-span-3"
                        onChange={(e) => setVaccineData({...vaccineData, name: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Date Administered
                    </Label>
                    <DatePicker datePicker={datePicker} setDatePicker={setDatePicker} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isButtonDisabled} type="submit" onClick={handleSubmit}>Add new vaccine record</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}