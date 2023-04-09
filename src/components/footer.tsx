import React from 'react';
import {IoLogoLinkedin, IoLogoFacebook, IoLogoGithub} from 'react-icons/io';
import '../styles/footer.scss';

interface FooterProps {
    title: string;
}

export const Footer: React.FC<FooterProps> = (props) => {

const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/aleksandr-grigorjev86/');
}

const handleGitHub = () => {
        window.open('https://github.com/Pribor86');
}

const handleFacebook = () => {
        window.open('https://www.facebook.com/pribor86/');
}

    return (
        <div className='footer sticky-footer'>
            <div className='footer-text'>
                <p>{props.title}</p>
                <IoLogoLinkedin className={'footer-link'} onClick={handleLinkedIn} size='1.2rem'/>
                <IoLogoGithub className={'footer-link'} onClick={handleGitHub} size='1.2rem'/>
                <IoLogoFacebook className={'footer-link'} onClick={handleFacebook} size='1.2rem'/>


            </div>
        </div>
    );
};