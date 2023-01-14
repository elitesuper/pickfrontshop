// import { FilterIcon } from '@/components/icons/filter-icon';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
// import GroupsDropdownMenu from './menu/groups-menu';
import classNames from 'classnames';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';

const Search = dynamic(() => import('@/components/ui/search/search'));

import dynamic from 'next/dynamic';

import { useIntersection } from 'react-use';
import { useEffect, useRef, useState } from 'react';
export default function MobileLogoSearch({
    className,
    variables,
}: {
    className?: string;
    variables: any;
}) {
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    });
    const { t } = useTranslation('common');
    const [, setDisplayMobileHeaderSearch] = useAtom(
        displayMobileHeaderSearchAtom
    );


    const [_, setDrawerView] = useAtom(drawerAtom);
    const [headerhide, setHeaderHide] = useState(true);

    useEffect(() => {
        console.log("ffffffffffffffff")
        if (intersection && intersection.isIntersecting) {
            //   setHeaderHide(true);
            setDisplayMobileHeaderSearch((prev) => !prev)
            console.log(true)
            return;
        }
        if (intersection && !intersection.isIntersecting) {
            console.log(false)
            setDisplayMobileHeaderSearch((prev) => !prev)
            //   setHeaderHide(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intersection]);



    return (
        <div
            className={classNames(
                'z-10 flex h-14 items-center justify-between border-b border-border-200 bg-light py-3 px-5 md:top-16 md:h-16 lg:top-22 lg:px-7 lg:hidden',
                className
            )}
            ref={intersectionRef}
        >
            <Search label={t('text-search-label')} variant="minimal" />

            {/* <GroupsDropdownMenu /> */}
        </div>
    );
}
