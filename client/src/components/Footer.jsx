import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white r py-4 mt-auto  bottom-0 w-screen z-50">
            <div className="md:flex md:justify-center sm:px-12 px-4 container mx-auto text-center">
                <p>&copy; 2023 Notes. All rights reserved.</p>
                <div className="flex justify-center mt-2">
                    <a href="https://twitter.com/Aatif_shaikh934" className="text-gray-300 hover:text-white mx-2">
                        <FontAwesomeIcon icon={faXTwitter} className="h-6 w-6" />
                    </a>
                    <a href="https://github.com/AatifxShaikh" className="text-gray-300 hover:text-white mx-2">
                        <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/aatif-shaikh-2b2a6b222/" className="text-gray-300 hover:text-white mx-2">
                        <FontAwesomeIcon icon={faLinkedinIn} className="h-6 w-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
