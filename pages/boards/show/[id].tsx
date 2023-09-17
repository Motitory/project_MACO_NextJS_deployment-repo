import authRequest from '@/utils/request/authRequest';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Board } from '../../../interfaces/board';
import { useLanguageResources } from '@/contexts/LanguageContext';

const ShowBoard = () => {
  const [board, setBoard] = useState<Board | null>(null);
  const [id, setId] = useState<number | null>(null);
  const router = useRouter();
  const resources = useLanguageResources();

  const showBoard = async (boardId: number) => {
    try {
      const response = await authRequest.get<Board>(
        `http://localhost:8000/boards/${boardId}`
      );
      setBoard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await authRequest.get('http://localhost:8000/auth');
      console.log(response.data);
      const userId = response.data?.id;
      if (userId) {
        setId(userId);
      } else {
        console.log('getUser 에러: 유효한 id가 없습니다.');
      }
      return response.data;
    } catch (error) {
      console.log('getUser 에러:', error);
    }
  };

  const handleEditClick = () => {
    if (board && board.user && board?.user.id === id) {
      router.push(`/boards/edit/${board.id}`);
    } else {
      window.alert('권한이 없습니다.');
      router.back();
    }
  };

  const handleDeleteClick = () => {
    if (board && board.user && board?.user.id === id) {
      deleteBoard();
      window.alert('삭제 완료');
    } else {
      window.alert('권한이 없습니다.');
      router.back();
    }
  };

  useEffect(() => {
    if (router.query.id) {
      const boardId = Number(router.query.id);
      showBoard(boardId);
    } else {
      window.alert('다시 로그인 해 주세요.');
    }
  }, [router.query]);

  useEffect(() => {
    getUser();
  }, []);

  const deleteBoard = async () => {
    try {
      await authRequest.delete(`http://localhost:8000/boards/${board?.id}`);
      window.alert('삭제 완료');
      router.replace('/boards/main');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {board ? (
        <>
          <div className="w-full max-w-2xl rounded-lg border border-gray-200 p-8">
            <div className="mb-6">
              <p className="text-sm text-gray-500">{resources.title}</p>
              <h1 className="text-3xl text-black">{board.title}</h1>
            </div>
            <div className="mb-8">
              <p className="text-sm text-gray-500">{resources.content}</p>
              <textarea
                className="h-56 w-full resize-none rounded-lg border border-gray-300 p-2 text-lg text-black"
                readOnly
                value={board.description}
                style={{ width: '100%' }}
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleEditClick}
                className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                {resources.update}
              </button>
              <button
                onClick={handleDeleteClick}
                className="cursor-pointer rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                {resources.delete}
              </button>
              <Link
                className="cursor-pointer rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                href={'/boards/main'}
              >
                {resources.goList}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p className="text-lg">{resources.loddingMessage}</p>
      )}
    </div>
  );
};

export default ShowBoard;
