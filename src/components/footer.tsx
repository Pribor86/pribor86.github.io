import React from 'react';
import '../styles/footer.scss';

interface FooterProps {
    title: string;
}

export const Footer: React.FC<FooterProps> = (props) => {
    return (
        <div className='footer sticky-footer'>
            <div className='footer-text'>
                <p>{props.title}</p>
            </div>
        </div>
    );
};