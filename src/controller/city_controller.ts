import { CityDomain } from "../domain/city_domain";
import express, { Express, Request, Response } from 'express';
var router = express.Router();

class CityController {
    static async getAllcity(req: Request, res: Response) {
        const cityDomain = new CityDomain();
        await cityDomain.getAllCity(req, res)
    }

    static async getcitylist(req: Request, res: Response) {
        const cityDomain = new CityDomain();
        await cityDomain.getcityList(req, res)
    }

}

router.get('/gh', CityController.getAllcity);
router.get('/', CityController.getcitylist);
export { router }