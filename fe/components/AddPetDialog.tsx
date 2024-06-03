import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import DatePicker from "@/components/ui/DatePicker";
import {instance} from "@/lib/utils";
import {useState} from "react";


export default function AddPetDialog(props: any) {
    const {ownerName, pets, setPets} = props;
    const [petData, setPetData] = useState<any>({});
    const [datePicker, setDatePicker] = useState<Date | null>(null);
    const handleSubmit = async () => {
        const newPet = {
            ownerName,
            ...petData
        };
        await instance.post(`/pets`, {
            ...newPet,
            dateOfBirth: datePicker
        });
        setPets([
            ...pets,
            newPet,
        ]);
    }
    const isButtonDisabled = !petData.petName || !petData.petType || !datePicker;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Pet</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add your new furry friend</DialogTitle>
                    <DialogDescription>
                        Fill out information regarding your new furry friend here
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Name
                    </Label>
                    <Input
                        id="name"
                        className="col-span-3"
                        onChange={(e) => setPetData({...petData, petName: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Pet Type
                    </Label>
                    <Input
                        id="type"
                        className="col-span-3"
                        onChange={(e) => setPetData({...petData, petType: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Date of Birth
                    </Label>
                    <DatePicker datePicker={datePicker} setDatePicker={setDatePicker} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isButtonDisabled} type="submit" onClick={handleSubmit}>Add new pet</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}