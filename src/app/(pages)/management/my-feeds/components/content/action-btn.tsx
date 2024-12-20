'use client'
import { DotsHorizontalIcon, CardStackPlusIcon } from "@radix-ui/react-icons";
import React, { createContext, useState } from "react";
import Actions from "./actions";
import TippyPopover from "@/app/components/common/tippy-popover";
import BundlesSelector from "./bundles-selector";
import { Bundle, RssGenerator } from "@prisma/client";
import BundleTag from "./bundle-tag";
interface RssItemContextType {
    rssData: RssGenerator | null
    updateRssBundle: (bundle: Bundle) => void
}

export const RssItemContext = createContext<RssItemContextType>({
    rssData: null,
    updateRssBundle: (bundle: Bundle) => { }
});

export default function ActionBtn({ rss }: { rss: RssGenerator }) {
    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        e.preventDefault();
    }

    const [rssData, setRssData] = useState<RssGenerator>(rss)

    function updateRssBundle(bundle: Bundle) {
        setRssData(prev => ({ ...prev, bundleId: bundle.id, bundle: bundle }))
    }

    return (
        <RssItemContext.Provider value={{ rssData, updateRssBundle }}>
            <div className="flex items-center gap-1 justify-center" onClick={handleClick}>
                {rssData?.bundleId && <BundleTag bundle={rssData.bundle} />}
                <TippyPopover content={<BundlesSelector />} props={{
                    trigger: 'click'
                }}>
                    <span className='hover:bg-gray-200 rounded-md p-1 size-6'>
                        <CardStackPlusIcon className="size-4 text-gray-600" />
                    </span>
                </TippyPopover>
                <TippyPopover content={<div><Actions /></div>}>
                    <span className='hover:bg-gray-200 rounded-md p-1 size-6'>
                        <DotsHorizontalIcon className='size-4 text-gray-600'></DotsHorizontalIcon>
                    </span>
                </TippyPopover>
            </div>
        </RssItemContext.Provider>
    )
}