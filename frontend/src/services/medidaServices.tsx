import axios from "axios";
import { Api } from "@/config/api";
import { Medida } from "@/interfaces/Medida";

const getAllMedidas = async (): Promise<Medida[] | any> => {
    try {
        const { data } = await Api.get('/sensor')
        return data.data as Medida[]
    } catch (error) {
        return []
    }
}

export const medidaServices = {
    getAllMedidas
};
  