import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DownIcon from '@/styles/down.png';
import Router from 'next/router';

export default function News(props: any) {
  interface Answer {
    answer: string;
  }

  // 定义 一个 QA 的数据结构
  interface QA {
    question: string;
    answers: Answer[];
  }

  // const inter = Inter({ subsets: ['latin'] });

  // 定义假数据
  const qas: QA[] = [
    {
      question: 'How to learn react js',
      answers: [
        {
          answer: 'Watch Youtube video',
        },
        // {
        //   answer: 'Learn from blogs',
        // },
        // {
        //   answer: 'Take part in camp',
        // },
      ],
    },
    {
      question: 'How to learn typescript',
      answers: [
        {
          answer: 'Watch Youtube video',
        },
        // {
        //   answer: 'Learn from blogs',
        // },
        // {
        //   answer: 'Take part in camp',
        // },
      ],
    },
    {
      question: 'How to learn Programming',
      answers: [
        {
          answer: 'Watch the Lecture, book. And Ask to Google',
        },
        // {
        //   answer: 'Learn from blogs',
        // },
        // {
        //   answer: 'Take part in camp',
        // },
      ],
    },
  ];

  const [searched, setSearched] = useState<boolean>(false);
  const [data, setData] = useState(qas);
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<QA[]>([]);
  const [openedQuestions, setOpenedQuestions] = useState<string[]>([]);

  useEffect(() => {
    setAnswers(qas);
  }, []);

  // 当点击 搜索时 调用
  const handleSearch = () => {
    // 如果问题无效，比如空格，直接结束该函数
    if (!question) {
      return;
    }

    setSearched(true);
    // 根据 question 从 data 中找到符合的问题及答案
    let answersMatched: QA[] = [];
    for (let item of data) {
      if (new RegExp(`.*${question}.*`, 'i').test(item.question)) {
        answersMatched = answersMatched.concat(item);
      }
    }

    // 更新 answers，重新渲染UI
    setAnswers(answersMatched);
  };

  // 当点击下拉扩展图标时
  const handleClickExpand = (question: string) => {
    if (openedQuestions.includes(question)) {
      setOpenedQuestions(openedQuestions.filter((item) => item !== question));
    } else {
      // ... 为解构运算符，可以把一个数组打散
      setOpenedQuestions([...openedQuestions, question]);
    }
  };

  // 当点击提问时触发
  const handleClickAsk = () => {
    return;
  };

  // 当点击回答时触发
  const handleClickAnswer = (question: QA) => {
    return;
  };

  return (
    <div className="z-50 h-1/2 overflow-hidden">
      <main className={styles.main}>
        <h1 className={styles.title}>News</h1>
        <div className={styles.formbox}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyUp={handleSearch}
            placeholder={'Enter your question here...'}
            className={styles.textbox}
          />
          <button onClick={handleSearch} className={styles.search}>
            Search
          </button>
          <button
            className={styles.ask}
            onClick={() => {
              Router.push('./askpage');
            }}
          >
            {' '}
            Ask
          </button>
        </div>
        {searched && answers.length === 0 && <h3>No Results</h3>}
        <ul className={styles.answerList}>
          {answers.map((answer, index) => {
            const open = openedQuestions.includes(answer.question);
            return (
              <li key={answer.question}>
                <h3 className={styles.question}>
                  <span>Question: {answer.question}</span>
                  <img
                    className={open ? styles.up : styles.down}
                    onClick={() => handleClickExpand(answer.question)}
                    src={DownIcon.src}
                    width={30}
                  />
                </h3>
                {open && (
                  <ul className={styles.answerList}>
                    <li
                      onClick={() => {
                        Router.push('./answerpage');
                      }}
                      className={styles.answerItem}
                      key={'answer'}
                    >
                      Answer this question
                    </li>
                    {answer.answers.map((answer, index) => {
                      return (
                        <li key={answer.answer}>
                          {index + 1}. {answer.answer}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
