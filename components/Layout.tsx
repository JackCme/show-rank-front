import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { Button, Drawer, Navbar } from 'react-daisyui';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import logoImage from '~/public/logo.png';

type Props = {
  children?: ReactNode;
  title?: string;
};

export default function Layout({ children, title }: Props) {
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
        </Navbar>

        {/* Page Content */}
        {children}
      </Drawer>
    </>
  );
}
