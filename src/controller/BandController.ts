import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";


export class BandController {
    

    signupBand = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const { name, music_genre, responsible } = req.body
            const input: BandInputDTO = {
                name,
                music_genre,
                responsible
            }

            const result = await new BandBusiness()
                .signupBand(input, token)

            res.status(201).send({ message: result })
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    getBandById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const result = await new BandBusiness()
                .getBandById(id)

            res.status(200).send({ result })
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
}