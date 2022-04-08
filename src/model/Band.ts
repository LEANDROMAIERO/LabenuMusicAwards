export interface BandInputDTO {
    name: string,
    music_genre: string,
    responsible: string
}

export interface Band extends BandInputDTO {
    id: string,
}
