'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useState} from "react";
import {instance} from "@/lib/utils";
import PetTable from "@/components/PetTable";
import AddPetDialog from "@/components/AddPetDialog";
import {useDispatch, useSelector} from "react-redux";
import {setOwnerName} from "@/lib/store";

export default function Home() {
    const ownerName = useSelector((state: any) => state.ownerName);
    const dispatch = useDispatch();
    const [pets, setPets] = useState<any>(null);
    const handleButtonClick = async () => {
        const ownerPets = await instance.get(`/pets/by-owner`, {
            params: {
                ownerName,
            }
        });
        setPets(ownerPets.data);
    }

    const handleNameChange = (e: any) => {
        dispatch(setOwnerName(e.target.value));
    }

    const handleSignOut = (e: any) => {
        dispatch(setOwnerName(''));
        setPets(null);
    }

  return (
    <div >
        {pets !== null && ownerName ?
            <div>
                <Button onClick={handleSignOut}>Change owner</Button>
            <AddPetDialog ownerName={ownerName} pets={pets} setPets={setPets}/>
            <PetTable pets={pets} />
            </div>
            : <div>
                <Input type="text" placeholder="What is your name?" value={ownerName} onChange={handleNameChange} />
                <Button type="submit" onClick={handleButtonClick}>Submit</Button>
            </div>
        }
    </div>
  );
}
