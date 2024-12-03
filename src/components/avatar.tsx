import { useEffect, useRef } from 'react';
import jazzicon from 'jazzicon';

interface JazziconAvatarProps {
  address: any;
  diameter: number;
}

const JazziconAvatar = ({ address, diameter }: JazziconAvatarProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (address && avatarRef.current) {
      const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const seed = parseInt(address.slice(2, 10), 16);
      const element = jazzicon(diameter * remInPx / 4, seed);
      avatarRef.current.innerHTML = '';
      avatarRef.current.appendChild(element);
    }
  }, [address, diameter]);

  return <div ref={avatarRef} className={`w-${diameter} h-${diameter} rounded-full overflow-hidden`}></div>;
};

export default JazziconAvatar;
