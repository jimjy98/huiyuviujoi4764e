'use client'
import PetTable from "@/components/PetTable";
import {useEffect, useState} from "react";
import {instance} from "@/lib/utils";
import {useToast} from "@/components/ui/use-toast";

export default function Admin() {
    const {toast} = useToast();
    const [pets, setPets] = useState(null);
    useEffect(() => {
        async function getPets() {
            const res = await instance.get('/pets');
            setPets(res.data);
        }
        try {
            getPets();
        } catch (e) {
            toast({
                title: 'Error fetching pets',
                variant: "destructive"
            })
        }
    }, [pets]);
    if (pets == null) {
        return null; //loader
    }
    return (
        <PetTable pets={pets} />
    )
}