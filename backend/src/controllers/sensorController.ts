import { Request, Response } from 'express';
import { SensorDHT11 } from '../models/SensorDHT11';

export const controllerSensor = {
    save: async (req: Request, res: Response) => {
        try {
            const { temperatura, umidade } = req.body; // Recebe os dados do sensor

            // Validação dos dados recebidos
            if (typeof temperatura !== 'number' || typeof umidade !== 'number') {
                return res.status(400).json({ message: 'Temperatura e umidade devem ser números.' });
            }

            // Criação do novo registro
            const novoSensor = await SensorDHT11.create({
                temperatura,
                umidade,
            });

            return res.status(201).json({
                message: 'Dados do sensor salvos com sucesso!',
                data: novoSensor,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao salvar dados do sensor.', error: error.message });
        }
    },

    getValores: async (req: Request, res: Response) => {
        try {
            // Recuperando todos os registros de sensores
            const sensores = await SensorDHT11.findAll();

            if (sensores.length === 0) {
                return res.status(404).json({ message: 'Nenhum valor de sensor encontrado.' });
            }

            return res.status(200).json({
                message: 'Valores de sensores recuperados com sucesso!',
                data: sensores,
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao recuperar dados do sensor.', error: error.message });
        }
    },
};
