import { Show, ShowOutputDTO, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase{
    
    private static TABLE_NAME = "NOME_TABELA_SHOWS"

    public async createShow(show: Show): Promise<void>{
        await this.getConnection()
        .insert({
            id: show.getId(),
            week_day: show.getWeekDay(),
            start_time: show.getStartTime(),
            end_time: show.getEndTime(),
            band_id: show.getBandId(),           

        })
        .into(ShowDatabase.TABLE_NAME)
    }


    public async getShowsByTimes(weekDay: WeekDay, startTime: number, endTime: number): Promise<ShowOutputDTO[]>{
        const shows = await this.getConnection()
        .select("*")
        .where("end_time", ">", `${startTime}`)
        .andWhere("start_time", "<", `${endTime}`)
        .andWhere("week_day", "=", `${weekDay}`)
        .from(ShowDatabase.TABLE_NAME)

        return shows.map((show)=>{
            return {
                id: show.id,
                bandId: show.bandId,
                startTime: show.startTime, 
                endTime: show.endTime,
                weekDay: show.weekDay
            }
        })
    }
}