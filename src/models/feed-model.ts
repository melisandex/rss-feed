import { Pagination, PaginationParams } from "@/types/pagination"
import { Feed } from "@prisma/client"


export const FeedModel = Symbol.for('FeedModel')

export interface FeedModel {
    queryUserFeed: (data: QueryUserFeedParams) => Promise<Pagination<Feed[]>>
    getFeed: (feedId: string) => Promise<Feed | null>
    createFeed: (feed: CreateFeedParams) => Promise<Feed>
    updateFeed: (feed: FeedParams) => Promise<Feed>
    deleteFeed: (feedId: string) => Promise<Feed>
    getFeedByLink: (link: string) => Promise<Feed | null>
}

export type FeedParams = Pick<Feed, 'id' | 'title' | 'link' | 'userId' | 'image' | 'author' | 'domain'> & Partial<Feed>
export type CreateFeedParams = Pick<Feed, 'title' | 'link' | 'domain' | 'rssId'> & Partial<Feed>
export interface QueryUserFeedParams extends PaginationParams {
    userId: string
}