// import { FilterIcon } from '@/components/icons/filter-icon';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
// import GroupsDropdownMenu from './menu/groups-menu';
import classNames from 'classnames';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import { Swiper, SwiperSlide, Pagination, Autoplay } from '@/components/ui/slider';
import Link from '@/components/ui/link';
import { useCategories } from '@/framework/category';
import { Image } from '@/components/ui/image';
export { default as productPlaceholder } from '@/assets/placeholders/product.svg';

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

    const { categories } = useCategories(variables);

    const [_, setDrawerView] = useAtom(drawerAtom);
    const [headerhide, setHeaderHide] = useState(true);

    useEffect(() => {
        // console.log("ffffffffffffffff", categories)
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
                'z-10 block relative items-center  border-b border-border-200 bg-light py-3 px-1 md:top-16 md:h-16 lg:top-22 lg:px-7 lg:hidden',
                className
            )}
        // ref={intersectionRef}
        >
            <div className='w-full'>
                <Search label={t('text-search-label')} variant="minimal" />
            </div>
            <div className='w-full' ref={intersectionRef}>
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
                    slidesPerView={4}
                // pagination={true}
                // pagination={{
                //     // clickableClass: 'cursor-pointer',
                //     // clickable: true,
                // }}
                >
                    {categories.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <Link href={`${idx}`}>
                                <div className="relative overflow-hidden border-black-100 p-3 h-full max-h-[60] w-full md:max-h-[60]">
                                    <div className='w-full'>
                                        <Image
                                            className="h-full w-full rounded-full !border-solid !border-double !border-4 !border-fuchsia-900"
                                            src={item.image.original ? item.image.original : ("/../../assets/placeholders/product.svg")}
                                            alt=''
                                            layout="responsive"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className='w-full'><p title={item.name} className='text-center line-clamp-1 hover:' >{item.name}</p></div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* <GroupsDropdownMenu /> */}
        </div>
    );
}
