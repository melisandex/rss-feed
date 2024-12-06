import { GenerateRssParams } from "@/models/rss-generator-model";
import { RssGenerator } from "@prisma/client";

export const RssGeneratorService = Symbol.for('RssGeneratorService');

export interface RssGeneratorService {
    getGenerateRss(id: string): Promise<RssGenerator | null>;
    createGenerateRss(data: GenerateRssParams): Promise<RssGenerator>;
    putGenerateRss(data: RssGenerator): Promise<RssGenerator>;
    deleteGenerateRss(id: string): Promise<string>;
}


