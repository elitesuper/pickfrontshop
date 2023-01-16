// import { FilterIcon } from '@/components/icons/filter-icon';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import { Swiper, SwiperSlide, Pagination, Autoplay } from '@/components/ui/slider';
import Link from '@/components/ui/link';
import { useCategories } from '@/framework/category';

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

    const { categories } = useCategories();

    console.log(variables.categories);
    const [_, setDrawerView] = useAtom(drawerAtom);
    const [headerhide, setHeaderHide] = useState(true);

    useEffect(() => {
        // console.log("ffffffffffffffff")
        if (intersection && intersection.isIntersecting) {
            //   setHeaderHide(true);
            setDisplayMobileHeaderSearch(false)
            // console.log(true)
            return;
        }
        if (intersection && !intersection.isIntersecting) {
            // console.log(false)
            setDisplayMobileHeaderSearch(true)
            //   setHeaderHide(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intersection]);



    return (
        <div
            className={classNames(
                'z-10 block h-40 items-center justify-between border-b border-border-200 bg-light py-3 px-5 md:top-16 md:h-16 lg:top-22 lg:px-7 lg:hidden',
                className
            )}
            ref={intersectionRef}
        >
            <div className='w-full'>
                <Search label={t('text-search-label')} variant="minimal" />
            </div>
            {/* <div className='w-full'>
                <Swiper
                    id="mobile-category-under-searchbox"
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Autoplay]}
                    resizeObserver={true}
                    allowTouchMove={true}
                    slidesPerView={6}
                // pagination={true}
                // pagination={{
                //     // clickableClass: 'cursor-pointer',
                //     // clickable: true,
                // }}
                >
                    {categories.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <Link href={`${idx}`}>
                                <div className="relative h-full max-h-[240px] w-full md:max-h-[610px]">
                                    {item.name}
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div> */}
            {/* <GroupsDropdownMenu /> */}
        </div>
    );
}
