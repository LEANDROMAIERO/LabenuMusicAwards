export interface BandInput {
    name: string,
    music_genre: string,
    responsible: string
}

export interface Band extends BandInput {
    id: string,
}