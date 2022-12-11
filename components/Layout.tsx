import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { Button, Drawer, Navbar, Swap, useTheme } from 'react-daisyui';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import { BsMoon, BsSun } from 'react-icons/bs';
import logoImage from '~/public/logo.png';
import CollapsibleMenu from './CollapsibleMenu';
import { useLocalStorage } from 'usehooks-ts';

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function Layout({ children, title }: Props) {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    closeMenu();
  }, [router.pathname]);

  React.useEffect(() => {
    const body = document.body;
    body.setAttribute('data-theme', theme);
  }, [theme]);

  const side = (
    <ul className="menu p-2 overflow-y-auto w-80 bg-base-100 text-base-content">
      <Link href="/" className="mb-5 hidden items-center lg:block">
        <Image src={logoImage} alt="logo" />
      </Link>
      <div className="flex-none lg:hidden">
        <Button shape="square" color="ghost" onClick={closeMenu}>
          <MdOutlineClose className="stroke-current" />
        </Button>
      </div>
      <li>
        <a>멤버십 신청</a>
      </li>
      <li>
        <a>솔루션 문의</a>
      </li>
      <CollapsibleMenu extra="STEP 1." title="상품 발굴">
        <div className="text-xs font-semibold pl-4 py-1">스마트스토어</div>
        <ul className="menu">
          <li>
            <Link href="/search/naver">키워드 조회 (검색량)</Link>
          </li>
        </ul>
      </CollapsibleMenu>
    </ul>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Drawer
        open={isOpen}
        onClickOverlay={closeMenu}
        side={side}
        mobile
        sideClassName="shadow-md"
      >
        {/* Navbar only for mobile */}
        <Navbar className="bg-base-100 shadow-md lg:hidden">
          <div className="flex-none">
            <Button shape="square" color="ghost" onClick={handleToggle}>
              <AiOutlineMenu className="stroke-current" />
            </Button>
          </div>
          <div className="flex-1">
            <Link href="/">SHOWRANK</Link>
          </div>
          <div className="flex-none">
            <Button
              shape="square"
              color="ghost"
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
            >
              <Swap
                onElement={<BsSun />}
                offElement={<BsMoon />}
                rotate
                active={theme === 'dark'}
              />
            </Button>
          </div>
        </Navbar>

        {/* Navbar for Desktop */}
        <Navbar className="hidden lg:flex">
          <Navbar.End>
            <Button
              shape="square"
              color="ghost"
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
            >
              <Swap
                onElement={<BsSun />}
                offElement={<BsMoon />}
                rotate
                active={theme === 'dark'}
                // onChange={toggleTheme}
              />
            </Button>
          </Navbar.End>
        </Navbar>

        {/* Page Content */}
        {children}
      </Drawer>
    </>
  );
}
