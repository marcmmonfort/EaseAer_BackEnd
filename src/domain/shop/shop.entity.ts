export interface ShopEntity {
    uuid: string;
    idCompanyShop: string; // idUser
    idLocationShop: string; // idLocation
    descriptionShop: string;
    webShop: string;
    scheduleShop: string; // "Domingo|Lunes|Martes|Miércoles|Jueves|Viernes|Sábado" ...
    // ... "09:00_20:30|09:00_20:30|09:00_20:30|09:00_20:30|09:00_22:00|09:00_22:00|09:00_22:00"
    deletedShop: boolean;
  }