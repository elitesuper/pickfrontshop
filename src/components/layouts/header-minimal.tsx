import Logo from '@/components/ui/logo';
import cn from 'classnames';
import StaticMenu from './menu/static-menu';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { authorizationAtom } from '@/store/authorization-atom';
import SearchWithSuggestion from '@/components/ui/search/search-with-suggestion';
import Link from '@/components/ui/link';
import GroupsDropdownMenu from './menu/groups-menu';
import LanguageSwitcher from '@/components/ui/language-switcher';
import { useIsHomePage } from '@/lib/use-is-homepage';
import { useMemo } from 'react';
import { useHeaderSearch } from '@/layouts/headers/header-search-atom';
import { motion } from 'framer-motion';
import { NavbarIcon } from '@/components/icons/navbar-icon';
import { UserIcon } from '@/components/icons/user-icon';
import { drawerAtom } from '@/store/drawer-atom';
import { useIsRTL } from '@/lib/locals';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { ShoppingBagIcon } from '@/components/icons/shopping-bag-icon';
import { useCart } from '@/store/quick-cart/cart.context';

const CartCounterIconButton = dynamic(
  () => import('@/components/cart/cart-counter-icon-button'),
  { ssr: false }
);
const Search = dynamic(() => import('@/components/ui/search/search'));

const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
  ssr: false,
});
const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });

const HeaderMinimal = ({ layout, variables }: { layout: string, variables: any }) => {
  const router = useRouter();
  const [_, setDrawerView] = useAtom(drawerAtom);
  const { isRTL } = useIsRTL();
  const { totalUniqueItems } = useCart();
  const { openModal } = useModalAction();

  const { t } = useTranslation('common');
  const [displayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);
  const [isAuthorize] = useAtom(authorizationAtom);
  const isMultilangEnable =
    process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
    !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;
  function handleSidebar(view: string) {
    setDrawerView({ display: true, view });
  }
  function handleJoin() {
    return openModal('LOGIN_VIEW');
  }
  return (
    <header className={cn('site-header-with-search h-14 md:h-16 lg:h-22')}>
      <div
        className={cn(
          ' fixed z-50 flex h-14 w-full items-center justify-between border-b border-border-200 bg-light px-4 py-5  shadow-sm transition-transform duration-300 md:h-16 lg:h-22 ltr:lg:pl-12 ltr:lg:pr-8 rtl:lg:pr-12 rtl:lg:pl-8',
          {
            'px-5 lg:!px-12 xl:px-16': layout === 'compact',
          }
        )}
      >
        <div className="flex w-full items-center lg:w-auto">
          {/* <Logo className="mx-auto lg:mx-0" /> */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setDrawerView({ display: true, view: 'FILTER_VIEW', data: variables })}
            className="flex h-full lg:hidden items-center justify-center p-2 my-auto focus:text-accent focus:outline-none"
          >
            <span className="sr-only">{t('text-burger-menu')}</span>
            <NavbarIcon className={`${isRTL && 'rotate-180 transform'}`} />
          </motion.button>
          <Logo className={`${!isMultilangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0'}`} />
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => handleSidebar('cart')}
            className="mobile-cart lg:hidden relative flex h-full items-center justify-center p-2 my-auto focus:text-accent focus:outline-none"
          >
            <span className="sr-only">{t('text-cart')}</span>
            <ShoppingBagIcon />
            {totalUniqueItems > 0 && (
              <span className="absolute top-0 mt-0.5 rounded-full bg-accent py-1 px-1.5 text-10px font-semibold leading-none text-light ltr:right-0 ltr:-mr-0.5 rtl:left-0 rtl:-ml-0.5">
                {totalUniqueItems}
              </span>
            )}
          </motion.button>

          {isAuthorize ? (
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => handleSidebar('AUTH_MENU_VIEW')}
              className="flex h-full items-center lg:hidden justify-center p-2 my-auto focus:text-accent focus:outline-none"
            >
              <span className="sr-only">{t('text-user')}</span>
              <UserIcon />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={handleJoin}
              className="flex h-full items-center lg:hidden justify-center p-2 my-auto focus:text-accent focus:outline-none"
            >
              <span className="sr-only">{t('text-user')}</span>
              <UserIcon />
            </motion.button>
          )}
          {isMultilangEnable ? (
            <div className="lg:hidden ltr:ml-auto rtl:mr-auto">
              <LanguageSwitcher />
            </div>
          ) : (
            ''
          )}

          <ul className="hidden shrink-0 items-center space-x-7 ltr:ml-10 ltr:mr-auto rtl:mr-10 rtl:ml-auto rtl:space-x-reverse lg:flex 2xl:space-x-10">
            <StaticMenu />
            <li className="hidden lg:inline-block xl:hidden">
              <Link
                href={`${router.asPath}/search`}
                className="flex items-center font-normal text-heading no-underline transition duration-200 hover:text-accent focus:text-accent"
              >
                {t('text-search')}
              </Link>
            </li>
          </ul>
        </div>

        {displayMobileHeaderSearch && (
          <div className="absolute top-0 block h-full w-full bg-light px-5 pt-1.5 ltr:left-0 rtl:right-0 md:pt-2 lg:hidden">
            <div className='flex w-full'>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setDrawerView({ display: true, view: 'FILTER_VIEW', data: variables })}

                className="flex h-full items-center justify-center p-2 my-auto focus:text-accent focus:outline-none"
              >
                <span className="sr-only">{t('text-burger-menu')}</span>
                <NavbarIcon className={`${isRTL && 'rotate-180 transform'}`} />
              </motion.button>

              <Search label={t('text-search-label')} variant="minimal" />

              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => handleSidebar('cart')}
                className="mobile-cart relative flex h-full items-center justify-center p-2 my-auto focus:text-accent focus:outline-none"
              >
                <span className="sr-only">{t('text-cart')}</span>
                <ShoppingBagIcon />
                {totalUniqueItems > 0 && (
                  <span className="absolute top-0 mt-0.5 rounded-full bg-accent py-1 px-1.5 text-10px font-semibold leading-none text-light ltr:right-0 ltr:-mr-0.5 rtl:left-0 rtl:-ml-0.5">
                    {totalUniqueItems}
                  </span>
                )}
              </motion.button>

              {isAuthorize ? (
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleSidebar('AUTH_MENU_VIEW')}
                  className="flex h-full items-center justify-center p-2 my-auto focus:text-accent focus:outline-none"
                >
                  <span className="sr-only">{t('text-user')}</span>
                  <UserIcon />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={handleJoin}
                  className="flex h-full items-center justify-center p-2 my-auto focus:text-accent focus:outline-none"
                >
                  <span className="sr-only">{t('text-user')}</span>
                  <UserIcon />
                </motion.button>
              )}
            </div>
          </div>
        )}

        {layout === 'compact' && (
          <div className="mx-auto hidden w-full px-8 xl:flex xl:w-6/12 xl:px-10 xl:rtl:w-4/12 2xl:rtl:w-5/12">
            <SearchWithSuggestion
              label={t('text-search-label')}
              variant="minimal"
              seeMore={true}
            />
          </div>
        )}

        <div className="hidden shrink-0 items-center space-x-9 rtl:space-x-reverse lg:flex">
          <GroupsDropdownMenu variant="minimal" />
          {isMultilangEnable ? (
            <div className="ms-auto lg:me-5 xl:me-8 2xl:me-10 flex-shrink-0">
              <LanguageSwitcher />
            </div>
          ) : (
            ''
          )}
          <CartCounterIconButton />
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link
              href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
              variant="button"
              target="_blank"
            >
              {t('text-become-seller')}
            </Link>
            {isAuthorize ? <AuthorizedMenu minimal={true} /> : <JoinButton />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMinimal;
