import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
	return ( <header className="primary-color-bg text-center d-flex justify-content-center">
      <Link href="/"><a><Image src="/images/logo_white_h.png" alt="" height="100" width="100%" /></a></Link>
    </header>)
}


export default Header;