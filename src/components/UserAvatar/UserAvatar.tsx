import React from 'react';
import Gravatar from 'react-gravatar';

interface UserAvatarProps {
  email?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  title?: string;
  alt?: string;
}

export const UserAvatar = ({
  email = 'default@email.com',
  size = 30,
  className = '',
  style = {},
  onClick,
  title = 'Avatar do usuário',
  alt = 'Avatar',
}: UserAvatarProps) => {
  return (
    <Gravatar
      email={email}
      size={size}
      className={className}
      style={{
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'inline-block',
        ...style,
      }}
      onClick={onClick}
      title={title}
      alt={alt}
      default="mp"
    />
  );
};
