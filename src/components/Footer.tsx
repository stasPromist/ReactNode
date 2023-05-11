import { Button } from '@react-email/button';
import './Footer.css';

function Footer() {
    return (
        <>
            <footer className="bgc text-center text-lg-start fixed-bottom ">
                <div className="text-center  p-3 colorText">
                    © 2023 Copyright :
                    <a className="colorText" href="https://ctacbars@gmail.com">  Barsky Stanislav</a>
{/* 
                    <Button href="https://orel.rostov.396@gmail.com" style={{ color: '#61dafb' }}>
                        Click me
                    </Button> */}
                </div>
            </footer>

        </>
    );
}

export default Footer;