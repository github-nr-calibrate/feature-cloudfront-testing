import React from 'react';
import PropTypes from 'types';

function Logo({ theme, fullWidth }) {
    const primaryColor = theme === 'light' ? '#ffffff' : '#120D3D';
    const logoWidth = fullWidth ? '100%' : '153';
    const logoHeight = fullWidth ? '100%' : '32';

    return (
      <svg width={logoWidth} height={logoHeight} viewBox="0 0 115 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.241 23.7004C15.1757 23.7004 18.7171 21.185 19.3267 16.2121H15.5531C15.1467 19.1322 13.1148 20.5779 10.241 20.5779C6.40936 20.5779 4.17423 17.8312 4.17423 13.1764V12.9451C4.17423 8.31911 6.5545 5.48572 10.212 5.48572C13.2018 5.48572 14.7403 6.90241 15.1757 9.64906H19.0945C18.63 4.79182 14.9435 2.42103 10.183 2.42103C4.40645 2.42103 0.110352 6.75785 0.110352 12.974V13.2053C0.110352 19.5659 3.73881 23.7004 10.241 23.7004Z" fill={primaryColor} />
        <path d="M26.7929 23.7004C28.8829 23.7004 30.7697 22.3993 31.6115 20.9248V23.4112H35.1239V8.2902H31.6115V10.5743C30.7407 9.07083 29.2603 7.97216 26.9381 7.97216C23.2806 7.97216 20.2327 11.0368 20.2327 15.8652V16.0965C20.2327 21.0115 23.2516 23.7004 26.7929 23.7004ZM27.6347 20.9248C25.5157 20.9248 23.8321 19.3346 23.8321 16.0097V15.7784C23.8321 12.5114 25.3996 10.7188 27.8089 10.7188C30.1601 10.7188 31.7276 12.3379 31.7276 15.6917V15.923C31.7276 19.3057 29.8989 20.9248 27.6347 20.9248Z" fill={primaryColor} />
        <path d="M37.6507 23.4112H41.163V1.29346H37.6507V23.4112Z" fill={primaryColor} />
        <path d="M43.7896 23.4112H47.3019V8.2902H43.7896V23.4112Z" fill={primaryColor} />
        <path d="M58.3175 23.7004C62.2362 23.7004 65.0519 20.7513 65.0519 15.8941V15.6628C65.0519 10.7766 62.1201 7.97216 58.3175 7.97216C56.0823 7.97216 54.1955 9.2732 53.3537 10.7188V1.29346H49.8414V23.4112H53.3537V20.9826C54.1665 22.515 55.9082 23.7004 58.3175 23.7004ZM57.4466 20.9248C54.8922 20.9248 53.2376 19.3346 53.2376 15.9519V15.7206C53.2376 12.3668 54.9793 10.7188 57.4176 10.7188C59.7108 10.7188 61.4525 12.3668 61.4525 15.7206V15.9519C61.4525 19.1901 60.0301 20.9248 57.4466 20.9248Z" fill={primaryColor} />
        <path d="M66.4688 23.4112H69.9812V15.5471C69.9812 12.3379 71.8389 11.3549 74.9159 11.326V8.0589C72.3614 8.08781 70.9391 9.21538 69.9812 11.1236V8.2902H66.4688V23.4112Z" fill={primaryColor} />
        <path d="M81.5544 23.7004C83.6444 23.7004 85.5312 22.3993 86.373 20.9248V23.4112H89.8853V8.2902H86.373V10.5743C85.5021 9.07083 84.0217 7.97216 81.6995 7.97216C78.042 7.97216 74.9941 11.0368 74.9941 15.8652V16.0965C74.9941 21.0115 78.013 23.7004 81.5544 23.7004ZM82.3962 20.9248C80.2772 20.9248 78.5935 19.3346 78.5935 16.0097V15.7784C78.5935 12.5114 80.161 10.7188 82.5703 10.7188C84.9216 10.7188 86.4891 12.3379 86.4891 15.6917V15.923C86.4891 19.3057 84.6603 20.9248 82.3962 20.9248Z" fill={primaryColor} />
        <path d="M97.4919 23.6715C98.566 23.6715 99.3207 23.498 99.8722 23.2956V20.52C99.3787 20.7224 98.8562 20.8091 98.1596 20.8091C97.0565 20.8091 96.4179 20.202 96.4179 18.872V10.9212H99.7561V8.2902H96.4179V4.9653H92.9056V8.2902H90.8736V10.9212H92.9056V19.1901C92.9056 22.0524 94.4731 23.6715 97.4919 23.6715Z" fill={primaryColor} />
        <path d="M107.975 23.7004C111.865 23.7004 114.448 21.9656 114.942 18.7853H111.545C111.284 20.2598 110.181 21.0983 108.062 21.0983C105.45 21.0983 103.998 19.4792 103.882 16.6169H115V15.605C115 10.1984 111.603 7.97216 107.83 7.97216C103.505 7.97216 100.283 11.0947 100.283 15.7784V16.0097C100.283 20.7802 103.505 23.7004 107.975 23.7004ZM103.94 14.275C104.289 11.9331 105.711 10.5164 107.83 10.5164C110.007 10.5164 111.342 11.6729 111.516 14.275H103.94Z" fill={primaryColor} />
        <path d="M45.5318 4.94629L43.3816 1.23683L47.682 1.23683L45.5318 4.94629Z" fill="#8B6AD5" />
      </svg>
    );
}

Logo.propTypes = {
  theme: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Logo;