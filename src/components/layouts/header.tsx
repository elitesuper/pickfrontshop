import Logo from '@/components/ui/logo';
import cn from 'classnames';
import StaticMenu from './menu/static-menu';
import { useAtom } from 'jotai';
import { displayMobileHeaderSearchAtom } from '@/store/display-mobile-header-search-atom';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { authorizationAtom } from '@/store/authorization-atom';
import { useIsHomePage } from '@/lib/use-is-homepage';
import { useMemo } from 'react';
import GroupsDropdownMenu from './menu/groups-menu';
import { useHeaderSearch } from '@/layouts/headers/header-search-atom';
import LanguageSwitcher from '@/components/ui/language-switcher';
import { motion } from 'framer-motion';
import { NavbarIcon } from '@/components/icons/navbar-icon';
import { UserIcon } from '@/components/icons/user-icon';
import { drawerAtom } from '@/store/drawer-atom';
import { useIsRTL } from '@/lib/locals';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { ShoppingBagIcon } from '@/components/icons/shopping-bag-icon';
import { useCart } from '@/store/quick-cart/cart.context';
import useHomepage from '@/lib/hooks/use-homepage';
import { useRouter } from 'next/router';




const Search = dynamic(() => import('@/components/ui/search/search'));
const AuthorizedMenu = dynamic(() => import('./menu/authorized-menu'), {
  ssr: false,
});
const JoinButton = dynamic(() => import('./menu/join-button'), { ssr: false });

interface Categorytype {
  type: string;
  limit: number;
  language: string;
  parent: string;
}

const Header = ({ layout }: { layout?: string }) => {
  const [_, setDrawerView] = useAtom(drawerAtom);
  const { isRTL } = useIsRTL();

  const router = useRouter();


  const { homePage }: any = useHomepage();

  const defaulttype = router.query.pages ? router.query.pages[0] : homePage.slug

  const ctypes: Categorytype = {
    type: defaulttype,
    limit: 1000,
    language: "en",
    parent: "null",
  }

  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const { show, hideHeaderSearch } = useHeaderSearch();
  const { totalUniqueItems } = useCart();

  const [displayMobileHeaderSearch] = useAtom(displayMobileHeaderSearchAtom);
  const [isAuthorize] = useAtom(authorizationAtom);
  const isHomePage = useIsHomePage();
  const isMultilangEnable =
    process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
    !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;

  // useEffect(() => {
  //   if (!isHomePage) {
  //     hideHeaderSearch();
  //   }
  // }, [isHomePage]);

  function handleSidebar(view: string) {
    setDrawerView({ display: true, view });
  }

  function handleJoin() {
    return openModal('LOGIN_VIEW');
  }
  const isFlattenHeader = useMemo(
    () => !show && isHomePage && layout !== 'modern',
    [show, isHomePage, layout]
  );
  return (
    <header
      className={cn('site-header-with-search h-14 md:h-16 lg:h-22', {
        'lg:!h-auto': isFlattenHeader,
      })}
    >
      <div
        className={cn(
          'fixed z-50 flex h-14 w-full transform-gpu items-center justify-between border-b border-border-200 bg-light px-4 py-5 shadow-sm transition-transform duration-300 md:h-16 lg:h-22 lg:px-8',
          {
            'lg:absolute lg:border-0 lg:bg-transparent lg:shadow-none':
              isFlattenHeader,
          }
        )}
      >
        <div className="flex w-full items-center lg:w-auto">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setDrawerView({ display: true, view: 'FILTER_VIEW', data: ctypes })}
            className="flex h-full lg:hidden items-center justify-center p-2 my-auto focus:text-accent focus:outline-none"
          >
            <span className="sr-only">{t('text-burger-menu')}</span>
            <NavbarIcon className={`${isRTL && 'rotate-180 transform'}`} />
          </motion.button>
          <Logo
            className={`${!isMultilangEnable ? 'mx-auto lg:mx-0' : 'ltr:ml-0 rtl:mr-0'
              }`}
          />
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => handleSidebar('cart')}
            className="mobile-cart relative flex h-full lg:hidden items-center justify-center p-2 my-auto focus:text-accent focus:outline-none"
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
          {/* {displayMobileHeaderSearch && (
            <div className="absolute top-0 block h-full w-full bg-light px-5 pt-1.5 ltr:left-0 rtl:right-0 md:pt-2 lg:hidden">
              <div className='flex w-full'>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleSidebar('MAIN_MENU_VIEW')}
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
          )} */}
          {isMultilangEnable ? (
            <div className="ltr:ml-auto rtl:mr-auto lg:hidden">
              <LanguageSwitcher />
            </div>
          ) : (
            ''
          )}

          <div className="hidden ltr:ml-10 ltr:mr-auto rtl:mr-10 rtl:ml-auto xl:block">
            <GroupsDropdownMenu />
          </div>
        </div>
        {isHomePage ? (
          <>
            {(show || layout === 'modern') && (
              <div className="mx-auto hidden w-full overflow-hidden px-10 lg:block xl:w-11/12 2xl:w-10/12">
                <Search label={t('text-search-label')} variant="minimal" />
              </div>
            )}

            {displayMobileHeaderSearch && (
              <div className="absolute top-0 block h-full w-full bg-light px-5 pt-1.5 ltr:left-0 rtl:right-0 md:pt-2 lg:hidden">
                <div className='flex w-full'>
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setDrawerView({ display: true, view: 'FILTER_VIEW', data: ctypes })}

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
          </>
        ) : null}
        <ul className="hidden shrink-0 items-center space-x-7 rtl:space-x-reverse lg:flex 2xl:space-x-10">
          <StaticMenu />
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <a
              href={`${process.env.NEXT_PUBLIC_ADMIN_URL}/register`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 shrink-0 items-center justify-center rounded border border-transparent bg-accent px-3 py-0 text-sm font-semibold leading-none text-light outline-none transition duration-300 ease-in-out hover:bg-accent-hover focus:shadow focus:outline-none focus:ring-1 focus:ring-accent-700"
            >
              {t('text-become-seller')}
            </a>
            <li>{isAuthorize ? <AuthorizedMenu /> : <JoinButton />}</li>
          </div>
          {isMultilangEnable ? (
            <div className="ms-auto lg:me-5 xl:me-8 2xl:me-10 hidden flex-shrink-0 lg:block">
              <LanguageSwitcher />
            </div>
          ) : (
            ''
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
