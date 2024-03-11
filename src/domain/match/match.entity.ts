export interface MatchEntity {
    uuid: string;
    idUserAMatch: string;
    idUserBMatch?: string;
    dateMatch?: Date;
    showMatch: boolean;
    deletedMatch: boolean;
}