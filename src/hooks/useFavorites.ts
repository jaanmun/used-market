import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface UseFavorite {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
  const router = useRouter();
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(productId);
  }, [currentUser, productId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) return;

    try {
      let request;

      if (hasFavorite) {
        request = () => axios.delete(`api/favorites/${productId}`);
      } else {
        request = () => axios.post(`api/favorites/${productId}`);
      }

      await request();

      /**
       * 데이터 업데이트 한 다음에 업데이트된 정보를
       * 화면에 바로 보여주기 위해서는 Nextjs13에서 추천하는 방법인
       * Router Refresh를 이용하여 화면 업데이트 해주면 된다.
       */
      router.refresh();
    } catch (error) {}
  };

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
