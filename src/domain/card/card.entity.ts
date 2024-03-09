export interface CardEntity {
    uuid: string;
    idUserCard: string;
    numberCard: Number;
    pointsCard: Number;
    levelCard: "rookie" | "explorer" | "captain" | "elite";
    deletedCard: boolean;
}
  