'use client';
import React, { ReactNode } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

interface TippyPopoverProps {
    content: ReactNode;
    children?: ReactNode;
    reference?: React.RefObject<HTMLDivElement>;
    props?: TippyProps;
}

export default function TippyPopover({ content, children, reference, props }: TippyPopoverProps) {
    const isClient = typeof window !== 'undefined';

    return (
        <Tippy
            content={content}
            reference={reference}
            theme='light'
            arrow={false}
            interactive={true}
            placement='bottom'
            appendTo={isClient ? document.body : 'parent'}
            {...props}
        >
            <div className='flex items-center justify-center'>
                {children}
            </div>
        </Tippy>
    );
}
