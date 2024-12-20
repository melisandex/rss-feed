import { inject, injectable } from "inversify";
import { GenerateRssParams, PaginationQueryGenerateRssListParams, PutGenerateRssParams, QueryGenerateRssListParams, RssGeneratorModel } from "../rss-generator-model";
import { Prisma, PrismaClient, RssGenerator } from "@prisma/client";
import { PrismaSymbol } from "@/lib/prisma";
import { includes } from "lodash";


@injectable()
export class RssGeneratorModelImpl implements RssGeneratorModel {
    constructor(
        @inject(PrismaSymbol)
        private _prisma: PrismaClient
    ) { }
    async getGenerateRss(id: string) {
        const result = await this._prisma.rssGenerator.findUnique({
            where: { id }
        })
        return result
    }
    async createGenerateRss(data: GenerateRssParams) {
        const result = await this._prisma.rssGenerator.create({
            data
        })
        return result
    }
    async putGenerateRss(data: PutGenerateRssParams) {
        const result = await this._prisma.rssGenerator.update({
            where: { id: data.id },
            data
        })
        return result
    }
    async deleteGenerateRss(id: string) {
        const result = await this._prisma.rssGenerator.delete({
            where: { id }
        })
        return result.id
    }
    async queryGenerateRssList(data: PaginationQueryGenerateRssListParams) {
        const { page, pageSize, type, frequency, createdAt, updatedAt, userId, bundleId } = data
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const where: Prisma.RssGeneratorWhereInput = {
            type,
            frequency,
            ...(createdAt && {
                createdAt: {
                    gte: createdAt,
                }
            }),
            ...(updatedAt && {
                updatedAt: {
                    gte: updatedAt
                }
            }),
            ...(userId && { userId }),
            ...(bundleId && { bundleId })
        }

        const result = await this._prisma.rssGenerator.findMany({
            skip,
            take,
            where,
            include: {
                bundle: true
            }
        })
        const total = await this._prisma.rssGenerator.count({
            where
        })
        return {
            result,
            total,
            page,
            pageSize
        }
    }
    async queryAllRssList(data: QueryGenerateRssListParams) {
        const { type, frequency, createdAt, updatedAt, userId, bundleId } = data
        const where: Prisma.RssGeneratorWhereInput = {
            type,
            frequency,
            ...(createdAt && {
                createdAt: {
                    gte: createdAt,
                }
            }),
            ...(updatedAt && {
                updatedAt: {
                    gte: updatedAt
                }
            }),
            ...(userId && { userId }),
            ...(bundleId && { bundleId })
        }
        const result = await this._prisma.rssGenerator.findMany({
            where
        })
        return result
    }
}
