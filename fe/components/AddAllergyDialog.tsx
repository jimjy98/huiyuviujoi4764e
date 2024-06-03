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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useToast} from "@/components/ui/use-toast";

export default function AddAllergyDialog(props: any) {
    const {toast} = useToast();
    const { id, petData, setPetData } = props;
    const [allergyData, setAllergyData] = useState<any>({});
    const handleSubmit = async () => {
        try {
            await instance.post(`/pets/${id}/allergy`, {
            ...allergyData
        });
        } catch (e) {
            toast({
                title: 'Error creating allergy record',
                variant: "destructive"

            });
        }

        setPetData({
            ...petData,
            allergies: [
                ...petData.allergies,
                allergyData
            ]
        });
    }
    const isButtonDisabled = !allergyData.petReactions || !allergyData.severity;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Allergy</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add allergy information for your pet</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Pet Reactions
                    </Label>
                    <Input
                        id="petreactions"
                        className="col-span-3"
                        onChange={(e) => setAllergyData({...allergyData, petReactions: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                        Severity
                    </Label>
                <Select onValueChange={(value)=> setAllergyData({...allergyData, severity: value})}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Severity" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="MILD">Mild</SelectItem>
                        <SelectItem value="SEVERE">Severe</SelectItem>
                    </SelectContent>
                </Select>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isButtonDisabled} type="submit" onClick={handleSubmit}>Add new allergy record</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}