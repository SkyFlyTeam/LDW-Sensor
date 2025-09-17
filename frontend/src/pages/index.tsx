import { DataTable } from "@/components/DataTable/Datatable"
import { Card } from "@/components/ui/card"
import { columns } from "./columns"

import { useState } from "react"
import { Medida } from "@/interfaces/Medida"
import { Button } from "@/components/ui/button"
import { medidaServices } from "@/services/medidaServices"

const MedidasPage = () => {
    const [medidas, setMedidas] = useState<Medida[]>([]);
    const [paramSelecionado, setParamSelecionado] = useState<Medida | null>(null);

    // Modal and side drawer controll
    const [showEditParam, setShowEditParam] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfimDelete] = useState<boolean>(false);

    const fetchMedidas = () => {
        try {
            medidaServices.getAllMedidas();
        } catch {
            console.log("erro")
        }
    }

    return (
        <>
            <div className="flex gap-3 flex-col">
                <h1>Paramêtros</h1>

                <Card className="flex flex-col gap-3 md:p-6 p-0 md:shadow-[0px_4px_35px_0px_rgba(0,_0,_0,_0.12)] md:bg-white bg-white-bg shadow-none">
                    <DataTable 
                        columns={columns} 
                        data={medidas}
                    />
                </Card>
            </div>
        </>
    )
}

export default MedidasPage;