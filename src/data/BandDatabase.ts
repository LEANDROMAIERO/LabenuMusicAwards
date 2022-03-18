import { Band } from "../model/Band"
import { BaseDatabase } from "./BaseDatabase"

export class BandDatabase extends BaseDatabase {
    
    private static TABLE_NAME = "NOME_TABELAS_BANDAS";

    public insertBand = async (band:Band) => {
        const {id, name, music_genre, responsible} = band

        await this.getConnection().insert({
            id,
            name,
            music_genre,
            responsible
        }).into(BandDatabase.TABLE_NAME)
    }

    public selectBandById = async(id:string): Promise<Band> => {
            try {
                const result = await this.getConnection()
                .select("*")
                .from(BandDatabase.TABLE_NAME)
                .where({id})
                return result[0]
                
            } catch (error: any) {
                throw new Error(error.slqMessage || error.message)
            }
    }

    public selectBandByName = async(name:string):Promise<Band> => {
        try {
            const isBandExists = await this.getConnection()
            .select("*")
            .from(BandDatabase.TABLE_NAME)
            .where({name})
            return isBandExists[0]
            
        } catch (error:any) {
            throw new Error(error.slqMessage || error.message)
        }
    }
    
}