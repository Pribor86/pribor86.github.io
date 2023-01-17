import React from "react";
import '../styles/backButton.scss';
interface IBackButtonProps {
    openInfoCard: () => void;
}
export const BackButton: React.FC<IBackButtonProps> = (props) => {
    return (
        <div className='back-button' onClick={props.openInfoCard}>
            <div className='back-button-label'>
                <span className='back-button-label-text'>Close Detail</span>
            </div>
        </div>
    );
}