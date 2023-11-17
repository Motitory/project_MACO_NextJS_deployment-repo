import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import authRequest from '@/utils/request/authRequest';
import { Board } from '../../interfaces/board';
import { useLanguageResources } from '@/contexts/LanguageContext';

type Post = {
  board: Board;
};

const fetchBoards = async (
  userId: number,
  page: number,
  limit: number
): Promise<{ boards: Board[]; total: number }> => {
  const response = await authRequest.get(
    `http://localhost:8000/boards?page=${page}&limit=${limit}`
  );
  const boards = response.data.data.filter(
    (board: { user: { id: number }; status: string }) =>
      (board.user && board.user.id === userId) ||
      board.status === 'PUBLIC' ||
      board.status === 'PRIVATE'
  );
  console.log(boards);
  return { boards, total: response.data.total };
};

const Boards = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const postsPerPage = 7;
  const router = useRouter();
  const resources = useLanguageResources();

  const { data: user } = useQuery('user', () =>
    authRequest.get('http://localhost:8000/auth')
  );

  const {
    data: boardsData,
    isLoading,
    error,
  } = useQuery(
    ['boards', userId, page, postsPerPage],
    () => fetchBoards(userId!, page, postsPerPage),
    { enabled: !!userId }
  );

  useEffect(() => {
    if (user?.data?.id) {
      setUserId(user.data.id);
    }
  }, [user]);

  if (isLoading) return <></>;
  if (error) {
    window.alert('다시 로그인 해 주십시오');
    router.replace('/login');
    return (
      <div>
        An error has occurred: {error instanceof Error ? error.message : ''}
      </div>
    );
  }

  const paginate = (pageNumber: number) => setPage(pageNumber);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-6 text-3xl">QnA</h1>
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
          <ul id="post-list">
            {boardsData?.boards.map((post) => (
              <li
                key={post.id}
                className="post-item mb-4 cursor-pointer rounded-lg bg-white p-4 shadow hover:bg-gray-100 hover:text-black"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {resources.contentNumber} : {post.id}
                      {post.status === 'PRIVATE' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 inline h-4 w-4 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 9a3 3 0 11-6 0 3 3 0 016 0zm-5 6a5 5 0 0110 0H5z" />
                        </svg>
                      )}
                    </span>
                    <span className="text-gray-600">
                      {resources.writer} :{' '}
                      {post.user ? post.user.nickname : 'Unknown'}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    {post.user?.id === userId || userId === 2 ? (
                      <Link href={`/boards/show/${post.id}`}>
                        <p className="post-title font-bold text-blue-600">
                          {resources.title} : {post.title}
                        </p>
                      </Link>
                    ) : post.status === 'PRIVATE' ? (
                      <Link href={`/boards/show/${post.id}`}>
                        <p
                          className="post-title font-bold text-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            window.alert(`${resources.privateContent}`);
                          }}
                        >
                          {resources.privateContent}
                        </p>
                      </Link>
                    ) : (
                      <Link href={`/boards/show/${post.id}`}>
                        <p className="post-title font-bold text-blue-600">
                          {resources.title} : {post.title}
                        </p>
                      </Link>
                    )}
                    {post.admin_check && (
                      <div className="flex items-center">
                        <span className="font-semibold text-green-600">
                          답변 완료
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 h-5 w-5 text-green-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            {[...Array(Math.ceil((boardsData?.total || 0) / postsPerPage))].map(
              (e, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 cursor-pointer rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 ${
                    page === i + 1 && 'bg-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
        <Link
          className="mt-4 cursor-pointer rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          href={'/boards/create'}
        >
          {resources.write}
        </Link>
      </div>
    </>
  );
};

export default Boards;
