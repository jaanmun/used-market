import useFavorite from '@/hooks/useFavorites';
import { User } from '@prisma/client';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  productId: string;
  currentUser?: User | null;
}

const HeartButton = ({ productId, currentUser }: HeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    productId,
    currentUser,
  });

  return (
    <div onClick={toggleFavorite} className="relative transition cursor-pointer hover:opacity-80">
      <AiOutlineHeart size={28} className="absolute fill-white -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500'} />
    </div>
  );
};

export default HeartButton;
