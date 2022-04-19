import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
	return (
	<header className="primary-color-bg text-center d-flex justify-content-center align-items-center">
      <Link href="/"><a><img src="/images/logo_white_h.png" alt="" objectFit="cover" height="100" width="100%" /></a></Link>
    </header>)
}


export default Header;