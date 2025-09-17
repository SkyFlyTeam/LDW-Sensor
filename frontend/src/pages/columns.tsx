"use client"

import { Button } from "@/components/ui/button";
import { Medida } from "@/interfaces/Medida"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Medida>[] = [
  {
    accessorKey: "data_hora",
    header: "Data e hora",
  },
  {
    accessorKey: "umidade",
    header: "Umidade",
  },
  {
    accessorKey: "temperatura",
    header: "Temperatura",
  },
]