import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {instance} from "@/lib/utils";

export default function PetTable(props: any) {
    const {pets} = props;
    const router = useRouter();
    const handleClick = (e: any, id: number) => {
        e.preventDefault()
        router.push(`/${id}`);
    }
    const handleClickDelete = async (e: any, id: number) => {
        e.preventDefault();
        await instance.delete(`/pets/${id}`);
    }
    return (
        <div>
        {pets.length > 0 ? <Table>
                <TableCaption>A list of pets.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Pet Name</TableHead>
                        <TableHead>Pet Type</TableHead>
                        <TableHead>Owner Name</TableHead>
                        <TableHead>Date of Birth</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pets.map((pet: {
                        id: number,
                        petName: string,
                        petType: string,
                        ownerName: string,
                        dateOfBirth: Date,
                    }) => {
                        return (
                            <TableRow key={pet.id} >
                                <TableCell onClick={(e) => handleClick(e, pet.id)}>{pet.petName}</TableCell >
                                <TableCell>{pet.petType}</TableCell>
                                <TableCell>{pet.ownerName}</TableCell>
                                <TableCell>{new Date(pet.dateOfBirth).toLocaleDateString()}</TableCell>
                                <Button onClick={(e) => handleClickDelete(e, pet.id)}>Delete</Button>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table> : <p>Seems like you have no pets (sad). please add some using the button above</p>}
        </div>
    )
}