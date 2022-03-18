import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { InvalidInputError } from "../error/InvalidInputError";
import { ShowError } from "../error/ShowError";
import { Show, ShowInputDTO } from "../model/Show";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private bandDatabase: BandDatabase,
        private idGenerate: IdGenerator,
        private authenticator: Authenticator
    ){}
    

    async createShow(input: ShowInputDTO, token: string){
        const tokenData = this.authenticator.getData(token)

        if(tokenData.role !== UserRole.ADMIN){
            throw new ShowError ("Somente administradores podem acessar este recurso")
        }

        if(!input.bandId || !input.weekDay || !input.startTime || !input.endTime){
            throw new InvalidInputError("Entrada inválida")
        }

        if(input.startTime < 8 || input.endTime > 23 || input. startTime >= input.endTime){
            throw new InvalidInputError("Horários inválidos")
        }

        if(!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)){
            throw new InvalidInputError("Os tempos devem ser inteiros para este recurso")
        }

        
        const registeredShows = await this.showDatabase.getShowsByTimes(input.weekDay, input.startTime, input.endTime)

        if(registeredShows.length){
            throw new InvalidInputError("Não é possível criar mais programas neste momento")
        }

        await this.showDatabase.createShow(
            Show.toShow({
                ...input,
                id: this.idGenerate.generate()
            })
        )
    }
}