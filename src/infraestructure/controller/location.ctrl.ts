import { LocationUseCase } from "../../application/locationUseCase";
import { Request, Response } from "express";

export class LocationController {
  constructor(private locationUseCase: LocationUseCase) {
    this.insertLocationCtrl = this.insertLocationCtrl.bind(this);
    this.listLocationCtrl = this.listLocationCtrl.bind(this);
    this.listLocationPagCtrl = this.listLocationPagCtrl.bind(this);
    this.getLocationByIdCtrl = this.getLocationByIdCtrl.bind(this);
    this.updateLocationCtrl = this.updateLocationCtrl.bind(this);
    this.deleteLocationCtrl = this.deleteLocationCtrl.bind(this);
    this.getNumLocationsCtrl = this.getNumLocationsCtrl.bind(this);
  }

  // CASE 1: insertLocation(data: LocationEntity): Promise<LocationEntity | null>;
  public async insertLocationCtrl({ body }: Request, res: Response) {
    const response = await this.locationUseCase.insertLocation(body);
    res.send(response);
  }

  // CASE 2: listLocation(): Promise<LocationEntity[] | null>;
  public async listLocationCtrl(req: Request, res: Response) {
    const response = await this.locationUseCase.listLocation();
    res.send(response);
  }

  // CASE 3: listLocationPag(numPage: string): Promise<LocationEntity[] | null>;
  public async listLocationPagCtrl({ params }: Request, res: Response) {
    const { numPage = "" } = params;
    const response = await this.locationUseCase.listLocationPag(`${numPage}`);
    res.send(response);
  }

  // CASE 4: getLocationById(uuid: string): Promise<LocationEntity | null>;
  public async getLocationByIdCtrl({ params }: Request, res: Response) {
    const { uuid = "" } = params;
    const response = await this.locationUseCase.getLocationById(`${uuid}`);
    res.send(response);
  }

  // CASE 5: updateLocation(uuid: string, data: LocationEntity): Promise<LocationEntity | null>;
  public async updateLocationCtrl({ params, body }: Request, res: Response) {
    const { uuid = "" } = params;
    const response = await this.locationUseCase.updateLocation(`${uuid}`, body);
    res.send(response);
  }

  // CASE 6: deleteLocation(uuid: string): Promise<LocationEntity | null>;
  public async deleteLocationCtrl({ params }: Request, res: Response) {
    const { uuid = "" } = params;
    const response = await this.locationUseCase.deleteLocation(`${uuid}`);
    res.send(response);
  }
  
  // CASE 7: getNumLocations(): Promise<string | null>;
  public async getNumLocationsCtrl(req: Request, res: Response) {
    const response = await this.locationUseCase.getNumLocations();
    const data = response ? response : "NOT_FOUND";
    res.send(data);
  }
}
