import { inject, injectable } from "inversify";
import { RssGeneratorService } from "../rss-generator-service";
import { RssGenerator } from "@prisma/client";
import { GenerateRssParams, RssGeneratorModel } from "@/models/rss-generator-model";

@injectable()
export class RssGeneratorServiceImpl implements RssGeneratorService {
    constructor(
        @inject(RssGeneratorModel) private _rssGeneratorModel: RssGeneratorModel
    ) {
    }
    getGenerateRss(id: string) {
        return this._rssGeneratorModel.getGenerateRss(id)
    }
    createGenerateRss(data: GenerateRssParams) {
        return this._rssGeneratorModel.createGenerateRss(data)
    }
    putGenerateRss(data: RssGenerator) {
        return this._rssGeneratorModel.putGenerateRss(data)
    }
    deleteGenerateRss(id: string) {
        return this._rssGeneratorModel.deleteGenerateRss(id)
    }
}