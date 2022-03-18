import { BandDatabase } from "../data/BandDatabase";
import { Band, BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class BandBusiness{

    signupBand = async (band:BandInputDTO, token:string): Promise<string> => {
      try {

        const tokenData = new Authenticator().getData(token)

        if(tokenData.role !== UserRole.ADMIN){
              throw new Error("Usuário não autorizado")
        }
        if (!band.name || !band.music_genre || !band.responsible){
                throw new Error("Prencha todos os campos solicitados")
            }
            const isBandExists:Band = await new BandDatabase().selectBandByName(band.name)

            if(isBandExists) {
              throw new Error("Banda já cadastrada")
            }  
            const id : string = IdGenerator.generate();

            await new BandDatabase().insertBand({
                id,
                name:band.name,
                music_genre: band.music_genre,
                responsible:band.responsible
            })
            const message = "Banda cadastrada com Sucesso!"
            return message

            
      } catch (error:any) {
        throw new Error(error.message);
      }
    }

    getBandById = async(id:string):Promise<Band> => {
      try {
        if(!id)
        {throw new Error("Prencha o ID da Banda")}

        const getBand:Band = await new BandDatabase().selectBandById(id)
        return getBand
        
      } catch (error:any) {
        throw new Error(error.message);
      }
    }
}