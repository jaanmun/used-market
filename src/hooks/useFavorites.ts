import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

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

    if (!currentUser) {
      toast.warn('먼저 로그인을 해주세요.');
      return;
    }

    console.log('currentUser', currentUser);

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

      if (hasFavorite) {
        toast.success('성공적으로 제거되었습니다.');
      } else {
        toast.success('성공적으로 추가되었습니다.');
      }
    } catch (error) {
      toast.error('실패하였습니다.');
    }
  };

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
