import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

// If any news does not contain an image, then we will use a placeholder image.
const noimg = 'path_to_no_image';

const News = () => {
  // Define states
  const [news, setNews] = useState([]);
  const [searchNews, setSearchNews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLiCategory, setActiveLiCategory] = useState(null);
  const [activeLiCountry, setActiveLiCountry] = useState(null);
  const [category, setCategory] = useState(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory != null) {
      return savedCategory;
    }
    return 'general';
  });
  const [country, setCountry] = useState(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry != null) {
      return savedCountry;
    }
    return 'us';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode != null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Add state variables for sentiments
  const [sentiments, setSentiments] = useState({
    general: 'neutral',
    business: 'neutral',
    entertainment: 'neutral',
    health: 'neutral',
    science: 'neutral',
    sports: 'neutral',
    technology: 'neutral',
  });

  // Add state variables to track visibility of sentiment dropdowns
  const [sentimentDropdownsVisible, setSentimentDropdownsVisible] = useState({
    general: false,
    business: false,
    entertainment: false,
    health: false,
    science: false,
    sports: false,
    technology: false,
  });

  useEffect(() => {
    const apiKey = 'api_key_here';

    const getTopHeadlines = async () => {
      setIsLoading(true);
      const params = {
        country,
        category,
        page,
        apiKey,
      };
      const response = await axios.get(
        'https://mocki.io/v1/005a7598-0d58-44bf-bac8-80f2661e97d1',
        // {params}
      );
      setNews(response.data.articles);
      setIsLoading(false);
    };

    const searchForArticles = async () => {
      if (searchQuery) {
        setIsSearchLoading(true);
        const params = {
          q: searchQuery,
          pageSize: 25,
          apiKey,
        };
        const response = await axios.get(
          'https://mocki.io/v1/005a7598-0d58-44bf-bac8-80f2661e97d1',
          // {params}
        );
        setSearchNews(response.data.articles);
        setIsSearchLoading(false);
      }
    };

    getTopHeadlines();
    searchForArticles();

    localStorage.setItem('selectedCategory', category);
    localStorage.setItem('selectedCountry', country);

    const body = document.querySelector('body');
    isDarkMode ? body.classList.add('dark') : body.classList.remove('dark');
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [category, country, page, searchQuery, isDarkMode]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.getAttribute('value'));
    setActiveLiCountry(e.target);
  };

  const toggleSentimentDropdown = (categoryName) => {
    setSentimentDropdownsVisible((prevVisibility) => ({
      ...prevVisibility,
      [categoryName]: !prevVisibility[categoryName],
    }));
  };

  const handleCategoryChange = (e, categoryName) => {
    const selectedCategory = e.target.getAttribute('value');
    setCategory(selectedCategory);
    setActiveLiCategory(e.target);

    // Update sentiment for the selected category
    setSentiments((prevSentiments) => ({
      ...prevSentiments,
      [selectedCategory]: 'positive', // You can set it to 'positive' initially
    }));

    // Toggle the sentiment dropdown visibility for the selected category
    toggleSentimentDropdown(categoryName);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className='flex flex-wrap justify-center w-full text-slate-900 dark:text-slate-100'>
        <h1 className='text-center text-4xl font-bold m-1 hover:cursor-pointer text-rose-600'>
          News Center
        </h1>
        <button className='text-3xl rounded-full font-bold' onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? '🌞' : '🌚'}
        </button>

        <div className='w-full flex justify-center' value={country} onClick={handleCountryChange}>
          <ul className='border-b-2 border-rose-600 text-slate-900 dark:text-slate-100 rounded flex flex-row space-x-20 hover:cursor-pointer country'>
            <li
              className={`${
                activeLiCountry === document.querySelector('ul.country li:nth-child(1)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='us'
            >
              United State
            </li>
            <li
              className={`${
                activeLiCountry === document.querySelector('ul.country li:nth-child(2)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='gb'
            >
              United Kingdom
            </li>
            <li
              className={`${
                activeLiCountry === document.querySelector('ul.country li:nth-child(3)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='ca'
            >
              Canada
            </li>
            <li
              className={`${
                activeLiCountry === document.querySelector('ul.country li:nth-child(4)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='au'
            >
              Australia
            </li>
          </ul>
        </div>
        <div className='w-full flex justify-center mb-5'>
          <ul className='border-b-2 border-rose-600 text-slate-900 dark:text-slate-100 rounded flex flex-row space-x-20 hover:cursor-pointer category'>
            <li
              className={`${
                activeLiCategory === document.querySelector('ul.category li:nth-child(1)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='general'
            >
              General
              <button onClick={() => toggleSentimentDropdown('general')} className='ml-2 text-rose-600 hover:cursor-pointer'>
                {sentimentDropdownsVisible.general ? 'Hide Sentiment' : 'Select Sentiment'}
              </button>
              {sentimentDropdownsVisible.general && (
                <select
                  className='ml-2'
                  value={sentiments.general}
                  onChange={(e) => {
                    setSentiments({ ...sentiments, general: e.target.value });
                  }}
                >
                  <option value='neutral'>Neutral</option>
                  <option value='positive'>Positive</option>
                  <option value='negative'>Negative</option>
                </select>
              )}
            </li>
            <li
              className={`${
                activeLiCategory === document.querySelector('ul.category li:nth-child(2)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='business'
            >
              Business
              <button onClick={() => toggleSentimentDropdown('business')} className='ml-2 text-rose-600 hover:cursor-pointer'>
                {sentimentDropdownsVisible.business ? 'Hide Sentiment' : 'Select Sentiment'}
              </button>
              {sentimentDropdownsVisible.business && (
                <select
                  className='ml-2'
                  value={sentiments.business}
                  onChange={(e) => {
                    setSentiments({ ...sentiments, business: e.target.value });
                  }}
                >
                  <option value='neutral'>Neutral</option>
                  <option value='positive'>Positive</option>
                  <option value='negative'>Negative</option>
                </select>
              )}
            </li>
            <li
              className={`${
                activeLiCategory === document.querySelector('ul.category li:nth-child(3)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='entertainment'
            >
              Entertainment
              <button onClick={() => toggleSentimentDropdown('entertainment')} className='ml-2 text-rose-600 hover:cursor-pointer'>
                {sentimentDropdownsVisible.entertainment ? 'Hide Sentiment' : 'Select Sentiment'}
              </button>
              {sentimentDropdownsVisible.entertainment && (
                <select
                  className='ml-2'
                  value={sentiments.entertainment}
                  onChange={(e) => {
                    setSentiments({ ...sentiments, entertainment: e.target.value });
                  }}
                >
                  <option value='neutral'>Neutral</option>
                  <option value='positive'>Positive</option>
                  <option value='negative'>Negative</option>
                </select>
              )}
            </li>
            <li
              className={`${
                activeLiCategory === document.querySelector('ul.category li:nth-child(4)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='health'
            >
              Health
              <button onClick={() => toggleSentimentDropdown('health')} className='ml-2 text-rose-600 hover:cursor-pointer'>
                {sentimentDropdownsVisible.health ? 'Hide Sentiment' : 'Select Sentiment'}
              </button>
              {sentimentDropdownsVisible.health && (
                <select
                  className='ml-2'
                  value={sentiments.health}
                  onChange={(e) => {
                    setSentiments({ ...sentiments, health: e.target.value });
                  }}
                >
                  <option value='neutral'>Neutral</option>
                  <option value='positive'>Positive</option>
                  <option value='negative'>Negative</option>
                </select>
              )}
            </li>
            <li
              className={`${
                activeLiCategory === document.querySelector('ul.category li:nth-child(5)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='science'
            >
              Science
              <button onClick={() => toggleSentimentDropdown('science')} className='ml-2 text-rose-600 hover:cursor-pointer'>
                {sentimentDropdownsVisible.science ? 'Hide Sentiment' : 'Select Sentiment'}
              </button>
              {sentimentDropdownsVisible.science && (
                <select
                  className='ml-2'
                  value={sentiments.science}
                  onChange={(e) => {
                    setSentiments({ ...sentiments, science: e.target.value });
                  }}
                >
                  <option value='neutral'>Neutral</option>
                  <option value='positive'>Positive</option>
                  <option value='negative'>Negative</option>
                </select>
              )}
            </li>
            <li
              className={`${
                activeLiCategory === document.querySelector('ul.category li:nth-child(6)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='sports'
            >
              Sports
              <button onClick={() => toggleSentimentDropdown('sports')} className='ml-2 text-rose-600 hover:cursor-pointer'>
                {sentimentDropdownsVisible.sports ? 'Hide Sentiment' : 'Select Sentiment'}
              </button>
              {sentimentDropdownsVisible.sports && (
                <select
                  className='ml-2'
                  value={sentiments.sports}
                  onChange={(e) => {
                    setSentiments({ ...sentiments, sports: e.target.value });
                  }}
                >
                  <option value='neutral'>Neutral</option>
                  <option value='positive'>Positive</option>
                  <option value='negative'>Negative</option>
                </select>
              )}
            </li>
            <li
              className={`${
                activeLiCategory === document.querySelector('ul.category li:nth-child(7)')
                  ? 'text-rose-600'
                  : 'text-black hover:text-rose-600 hover:transition-all'
              }`}
              value='technology'
            >
              Technology
              <button onClick={() => toggleSentimentDropdown('technology')} className='ml-2 text-rose-600 hover:cursor-pointer'>
                {sentimentDropdownsVisible.technology ? 'Hide Sentiment' : 'Select Sentiment'}
              </button>
              {sentimentDropdownsVisible.technology && (
                <select
                  className='ml-2'
                  value={sentiments.technology}
                  onChange={(e) => {
                    setSentiments({ ...sentiments, technology: e.target.value });
                  }}
                >
                  <option value='neutral'>Neutral</option>
                  <option value='positive'>Positive</option>
                  <option value='negative'>Negative</option>
                </select>
              )}
            </li>
          </ul>
        </div>
        <span className='text-sm text-rose-600'>
          Currently, you are watching fake/static data from the mocki API. Functionalities like searching news, the next page will not work.
        </span>

        {/* News will be here */}
        <div className='w-full flex'>
          <div className='w-full grid grid-cols-2'>
            {isLoading ? (
              <div className='flex justify-center items-center h-screen'>
                <InfinitySpin color='#dc2626' width={100} />
              </div>
            ) : (
              news.map((article, index) => (
                <div className='w-full' key={index}>
                  <div
                    className='rounded-b-3xl overflow-hidden bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 hover:transition-all dark:hover:transition-all shadow-lg m-5 border dark:border-slate-600'
                    style={{ height: '600px' }}
                  >
                    <img
                      className='w-full h-80 object-cover'
                      src={article.urlToImage ? article.urlToImage : noimg}
                      alt={article.title}
                      onError={(e) => {
                        e.target.src = noimg;
                      }}
                    />
                    <div className='px-6 py-4 h-56'>
                      <div className='font-bold text-xl mb-2'>{article.title}</div>
                      <p className='text-slate-700 dark:text-slate-300'>{article.description}</p>
                    </div>
                    <div className='flex justify-between items-baseline px-6'>
                      <div className='text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900 px-3 py-1'>
                        {article.source.name}
                      </div>
                      <a
                        className='bg-rose-500 hover:bg-rose-600 hover:transition-all text-white font-bold py-2 px-4 rounded'
                        href={article.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='w-1/3'>
            <div>
              <form onSubmit={handleSearchSubmit}>
                <div className='w-full flex justify-between bg-slate-50 dark:bg-slate-900 border-2 dark:border-slate-600 rounded-xl h-10 mt-5'>
                  <input
                    type='text'
                    className='bg-slate-50 dark:bg-slate-900 pl-5 text-rose-600 focus:outline-none rounded-xl'
                    value={searchQuery}
                    placeholder='search news articles...'
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              {isSearchLoading ? (
                <div className='flex justify-center items-center h-screen'>
                  <InfinitySpin color='#dc2626' width={100} />
                </div>
              ) : (
                <>
                  {searchNews.map((article) => (
                    <div className='rounded-xl bg-slate-50 hover:bg-white dark:bg-slate-900 dark:hover:bg-slate-800 hover:transition-all dark:hover:transition-all shadow-lg m-5 border dark:border-slate-600' key={article.title}>
                      <img
                        className='w-full h-36 object-cover rounded-t-xl'
                        src={article.urlToImage ? article.urlImage : noimg}
                        alt={article.title}
                        onError={(e) => {
                          e.target.src = noimg;
                        }}
                      />
                      <ul>
                        <li className='p-2 m-2'><a href={article.url} target='_blank' rel='noopener noreferrer'>{article.title}</a></li>
                      </ul>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Build previous and next page buttons */}
        <div className='w-full flex justify-center mb-5'>
          <button
            className='text-red-600 bg-red-100 dark:bg-red-900 dark:text-slate-200 py-1 px-4 rounded mt-10 mr-5'
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous Page
          </button>

          <button
            className='text-red-600 bg-red-100 dark:bg-red-900 dark:text-slate-200 py-1 px-4 rounded mt-10 mr-5'
            onClick={() => handlePageChange(page + 1)}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default News;
