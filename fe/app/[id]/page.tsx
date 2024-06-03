'use client';

import {useEffect, useState} from "react";
import {instance} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import AddAllergyDialog from "@/components/AddAllergyDialog";
import AddVaccineDialog from "@/components/AddVaccineDialog";

export default function PetView({params}: {params: {id: string}}) {
    const [petData, setPetData] = useState<any>(null);
    useEffect( () => {
        const fetchPetData = async () => {
            const res = await instance.get('/pets/' + params.id);
            setPetData(res.data);
        }
        fetchPetData();
    }, [params.id]);

    if (!petData) {
        return null; //loader
    }

    else return (
        <div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                    Pet Name
                </Label>
                <Label
                    id="name"
                    className="col-span-3"
                >{petData.petName}</Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                    Pet Type
                </Label>
                <Label
                    id="type"
                    className="col-span-3"
                >{petData.petType}</Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                    Owner Name
                </Label>
                <Label
                    id="name"
                    className="col-span-3"
                >{petData.ownerName}</Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                    Date Of Birth
                </Label>
                <Label
                    id="name"
                    className="col-span-3"
                >{new Date(petData.dateOfBirth).toLocaleDateString()}</Label>
            </div>
            <AddAllergyDialog id={params.id} petData={petData} setPetData={setPetData} />
            {petData.allergies.length > 0 ? <Table>
                <TableCaption>Allergies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Pet Reactions</TableHead>
                        <TableHead>Severity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {petData.allergies.map((allergy: any) => (
                        <TableRow key={allergy.id}>
                            <TableCell>{allergy.petReactions}</TableCell>
                            <TableCell>{allergy.severity}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table> : <p>No allergies</p>}
            <AddVaccineDialog id={params.id} petData={petData} setPetData={setPetData} />
            {petData.vaccines.length > 0 ? <Table>
                <TableCaption>Vaccines</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date Administered</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {petData.vaccines.map((vaccine: any) => (
                        <TableRow key={vaccine.id}>
                            <TableCell>{vaccine.name}</TableCell>
                            <TableCell>{new Date(vaccine.dateAdministered).toLocaleDateString()}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table> : <p>No vaccines</p>}
        </div>
    )
}