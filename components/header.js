import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
	return (
	<header className="primary-color-bg text-center d-flex justify-content-center align-items-center py-1">
      <Link href="/"><a><img src="/images/logo_white_h.png" alt="" objectFit="cover" style={{width: '100px',height:'auto'}}  /></a></Link>
    </header>)
}


export default Header;